from djoser.views import TokenCreateView as BaseTokenCreateView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserLoginSerializer

class TokenCreateView(BaseTokenCreateView):

    def _action(self, serializer):

        user = serializer.user

        refresh = RefreshToken.for_user(user)

        user_data = UserLoginSerializer(user).data

        response_data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": user_data,
            "is_admin": user.is_superuser
        }

        return Response(response_data, status=status.HTTP_200_OK)

