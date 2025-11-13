from rest_framework.permissions import BasePermission, SAFE_METHODS

from .models import Membership

class IsAuthorOfClubContent(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user


class IsClubLeader(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated: return False
        
        club_id = view.kwargs.get('club_pk')
        if club_id is None: return False # No club provided.

        return Membership.objects.filter(user=user, club_id=club_id, role='L').exists()


class IsClubLeaderOrReadyOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS: return True
        return IsClubLeader.has_permission(self, request, view)


class IsClubMember(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated: return False
        
        club_id = view.kwargs.get('club_pk')
        if club_id is None: return False # No club provided.

        return Membership.objects.filter(user=user, club_id=club_id).exists()


class IsClubMemberOrReadyOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS: return True
        return IsClubMember.has_permission(self, request, view)