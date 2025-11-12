from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework.validators import UniqueValidator
from rest_framework import serializers

from sundevilconnect.serializers import MembershipSerializer

class UserCreateSerializer(BaseUserCreateSerializer):
    username = serializers.CharField(
        max_length=150,
        validators=[UniqueValidator(get_user_model().objects.all(), message='Username is already in use.')]
    )
    first_name = serializers.CharField(max_length=150, write_only=True)
    last_name = serializers.CharField(max_length=150, write_only=True)
    email = serializers.EmailField(
        validators=[UniqueValidator(get_user_model().objects.all(), message='Email already in use.')]
    )
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    @transaction.atomic
    def create(self, validated_data):
        """
        Creates a new Customer together with its auth User in one call.
        """
        username = validated_data.pop('username')
        first = validated_data.pop('first_name')
        last = validated_data.pop('last_name')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        User = get_user_model()
        user = User.objects.create_user(
            username=username,
            first_name=first,
            last_name=last,
            email=email,
            password=password
        )
        user.save()

        return user

    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            'id',
            'username', 'first_name', 'last_name', 'email',
            'password',
        ]


class UserLoginSerializer(BaseUserCreateSerializer):
    memberships = MembershipSerializer(many=True, read_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        model = get_user_model()
        fields = [
            'id',
            'username', 'email',
            'memberships',
        ]

