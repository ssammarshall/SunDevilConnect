from rest_framework.viewsets import ModelViewSet

from .models import Club, Event
from .serializers import ClubSerializer, EventSerializer

class ClubViewSet(ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer