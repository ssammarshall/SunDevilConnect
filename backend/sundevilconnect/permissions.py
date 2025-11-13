from rest_framework.permissions import BasePermission

from .models import Membership

class IsClubLeader(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated: return False
        
        club_id = request.data.get('club')
        if club_id is None: return False # No club provided.

        return Membership.objects.filter(user=user, club_id=club_id, role=Membership.ROLE_CHOICES[Membership.LEADER]).exists()


class IsClubMember(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated: return False
        
        club_id = request.data.get('club')
        if club_id is None: return False # No club provided.

        return Membership.objects.filter(user=user, club_id=club_id).exists()