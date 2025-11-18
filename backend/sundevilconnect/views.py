from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Club, ClubContent, Event, Membership
from .permissions import IsAuthorOfClubContent, IsClubLeader, IsClubLeaderOrReadyOnly, IsClubMember
from .serializers import ClubSerializer, ClubContentSerializer, EventSerializer, EventCreateSerializer, EventPartialUpdateSerializer

class ClubViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    
    def get_permissions(self):
        match self.action:
            case 'create': return [IsAdminUser()]
            case 'destroy': return [IsAdminUser()]
            case 'partial_update': return [IsClubLeader()]
            case _: return [IsClubLeaderOrReadyOnly()]

    @action(detail=True, methods=['get', 'post'], url_path='join')
    def join(self, request, pk=None):
        user = request.user
        club = self.get_object()

        if Membership.objects.filter(user=user, club=club).exists():
            raise ValidationError("You are already a member of this club.")
        
        Membership.objects.create(
            user=user,
            club=club,
            role=Membership.MEMBER
        )

        return Response(
            {"message": f"You joined {club.name} successfully."},
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['post'], url_path='leave')
    def leave(self, request, pk=None):
        user = request.user
        club = self.get_object()

        membership = Membership.objects.filter(user=user, club=club).first()
        if not membership:
            raise ValidationError("You are not a member of this club.")

        membership.delete()

        return Response(
            {"message": f"You left {club.name}."},
            status=status.HTTP_200_OK
        )


class ClubContentViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    serializer_class = ClubContentSerializer

    def get_queryset(self):
        return ClubContent.objects.filter(club_id=self.kwargs['club_pk'])
    
    def get_permissions(self):
        match self.action:
            case 'create': return [IsClubMember()]
            case 'destroy': return [IsAuthorOfClubContent()]
            case 'partial_update': return [IsAuthorOfClubContent()]
            case _: return [AllowAny()]

    def get_serializer_context(self):
        return {'club_id': self.kwargs['club_pk']}

    def perform_create(self, serializer):
        club_id = self.kwargs.get("club_pk")
        serializer.save(
            author=self.request.user,
            club_id=club_id
        )
    
    @action(detail=True, methods=['get', 'post'], url_path='flag') # TODO: 'get' only required when using drf; not necessary for use on frontend?
    def flag(self, request, club_pk=None, pk=None):
        content = self.get_object()
        content.is_flagged = True
        content.save()

        return Response(
            {"message": "Content flagged successfully."},
            status=status.HTTP_200_OK
        )


# Events for a specific Club.
class ClubEventViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    permission_classes = [IsClubLeaderOrReadyOnly]

    def get_queryset(self):
        return Event.objects.filter(club_id=self.kwargs['club_pk']).prefetch_related('club')
    
    def get_serializer_class(self):
        match self.action:
            case 'create': return EventCreateSerializer
            case 'partial_update': return EventPartialUpdateSerializer
            case _: return EventSerializer


# All Events.
class EventViewSet(ModelViewSet):
    http_method_names = ['get']

    queryset = Event.objects.all().prefetch_related('club')
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

