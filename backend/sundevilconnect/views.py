from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from .models import Membership, Club, ClubContent, Event
from .serializers import ClubSerializer, ClubContentSerializer, EventSerializer, EventCreateSerializer, EventPartialUpdateSerializer

class ClubViewSet(ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer


class ClubContentViewSet(ModelViewSet):
    serializer_class = ClubContentSerializer

    def get_queryset(self):
        return ClubContent.objects.filter(club_id=self.kwargs['club_pk'])
    
    def get_serializer_context(self):
        return {'club_id': self.kwargs['club_pk']}


class EventViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    queryset = Event.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def check_is_club_leader(self, user, club_id):
        if not Membership.objects.filter(
            user=user,
            club_id=club_id,
            role='L'
        ).exists(): raise PermissionDenied("Only club leaders can create events for this club.")

    def create(self, request, *args, **kwargs):
        user = request.user
        if user is None:
            raise PermissionDenied("Must be logged in.") # Should never reach this line because of permission_classes requiring authentication.

        club_id = request.data.get("club")
        if club_id is None:
            raise PermissionDenied("Club is required to post new events.")
        
        self.check_is_club_leader(request.user, club_id)
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        event = self.get_object()
        self.check_is_club_leader(request.user, event.club_id)
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        event = self.get_object()
        self.check_is_club_leader(request.user, event.club_id)
        return super().destroy(request, *args, **kwargs)

    def get_serializer_class(self):
        match self.action:
            case 'create': return EventCreateSerializer
            case 'partial_update': return EventPartialUpdateSerializer
            case _: return EventSerializer
