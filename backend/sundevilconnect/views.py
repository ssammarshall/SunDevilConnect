from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from .models import Club, ClubContent, Event
from .permissions import IsClubLeaderOrReadyOnly, IsClubMember
from .serializers import ClubSerializer, ClubContentSerializer, EventSerializer, EventCreateSerializer, EventPartialUpdateSerializer

class ClubViewSet(ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ClubContentViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    serializer_class = ClubContentSerializer

    def get_queryset(self):
        return ClubContent.objects.filter(club_id=self.kwargs['club_pk'])
    
    def get_permissions(self):
        match self.action:
            case 'create': return [IsClubMember()]
            case 'destroy': return [IsClubMember()]
            case 'partial_update': return [IsClubMember()]
            case _: return [AllowAny()]

    def get_serializer_context(self):
        return {'club_id': self.kwargs['club_pk']}

    def perform_create(self, serializer):
        club_id = self.kwargs.get("club_pk")
        serializer.save(
            author=self.request.user,
            club_id=club_id
        )


class EventViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    queryset = Event.objects.all()
    permission_classes = [IsClubLeaderOrReadyOnly]

    def get_serializer_class(self):
        match self.action:
            case 'create': return EventCreateSerializer
            case 'partial_update': return EventPartialUpdateSerializer
            case _: return EventSerializer
