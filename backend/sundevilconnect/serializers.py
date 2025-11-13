from rest_framework import serializers

from .models import Membership, Club, ClubContent, Event

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['club', 'role']


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name', 'description']


class ClubContentSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        club_id = self.context['club_id']
        return ClubContent.objects.create(club_id=club_id, **self.validated_data)

    class Meta:
        model = ClubContent
        fields = ['id', 'title', 'body']


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