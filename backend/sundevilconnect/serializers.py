from rest_framework import serializers

from .models import Membership, Club, ClubContent, Event

class MembershipSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    club_id = serializers.IntegerField(source='club.id', read_only=True)
    club_name = serializers.CharField(source='club.name', read_only=True)

    class Meta:
        model = Membership
        fields = ['user', 'club_id', 'role']


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name', 'description']


class ClubContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubContent
        fields = ['id', 'title', 'body']
        read_only_fields = ['author']


# Removes description field.
class ClubSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name']


class EventSerializer(serializers.ModelSerializer):
    club = ClubSimpleSerializer()

    class Meta:
        model = Event
        fields = ['id', 'name', 'date', 'location', 'is_paid_event', 'attendees', 'max_num_of_attendees', 'category', 'club']


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'date', 'location', 'is_paid_event', 'max_num_of_attendees', 'category', 'club']


class EventPartialUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'date', 'location', 'is_paid_event', 'max_num_of_attendees', 'category'] 