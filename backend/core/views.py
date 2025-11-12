from djoser import utils
from djoser.conf import settings
from djoser.views import TokenCreateView as BaseTokenCreateView
from rest_framework import status
from rest_framework.response import Response

from .serializers import UserLoginSerializer

class TokenCreateView(BaseTokenCreateView):

    def _action(self, serializer):
        token = utils.login_user(self.request, serializer.user)
        token_serializer_class = settings.SERIALIZERS.token

        user = serializer.user 
        user_data = UserLoginSerializer(user).data

        response_data = token_serializer_class(token).data
        response_data['user_data'] = user_data

        return Response(
            data=response_data, status=status.HTTP_200_OK
        )
