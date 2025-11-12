from rest_framework import serializers

from .models import Membership, Club, Event

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['club', 'role']


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