from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from .models import Membership, Club, Event
from .serializers import ClubSerializer, EventSerializer, EventCreateSerializer, EventPartialUpdateSerializer

class ClubViewSet(ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer


class EventViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    queryset = Event.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        user = request.user
        if user is None:
            raise PermissionDenied("Must be logged in.") # Should never reach this line because of permission_classes requiring authentication.

        club_id = request.data.get("club")
        if club_id is None:
            raise PermissionDenied("Club is required to post new events.")
        
        is_club_leader = Membership.objects.filter(
            user=user,
            club_id=club_id,
            role='L'
        ).exists()

        if not is_club_leader:
            raise PermissionDenied("Only club leaders can create events for this club.")

        return super().create(request, *args, **kwargs)

    def get_serializer_class(self):
        match self.action:
            case 'create': return EventCreateSerializer
            case 'partial_update': return EventPartialUpdateSerializer
            case _: return EventSerializer