from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Club, Event

class UserSerializer(serializers.ModelSerializer):
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
    confirm_password = serializers.CharField(style={"input_type": "password"}, write_only=True)

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
        validated_data.pop('confirm_password')

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
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match'})
        validate_password(attrs['password'])
        return super().validate(attrs)

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'username', 'first_name', 'last_name', 'email', # User fields.
            'password', 'confirm_password', # Django password validation fields.
        ]

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name', 'description']


# Removes description field.
class ClubSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name']


class EventSerializer(serializers.ModelSerializer):
    club = ClubSimpleSerializer()

    class Meta:
        model = Event
        fields = ['id', 'name', 'date', 'location', 'is_paid_event', 'attendees', 'max_num_of_attendees', 'club']


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'date', 'location', 'is_paid_event', 'max_num_of_attendees', 'club']


class EventPartialUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'date', 'location', 'is_paid_event', 'max_num_of_attendees']