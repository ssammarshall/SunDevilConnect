from rest_framework.viewsets import ModelViewSet

from .models import Club, Event

class ClubViewSet(ModelViewSet):
    queryset = Club.objects.all()

class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()