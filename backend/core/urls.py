from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .views import TokenCreateView

urlpatterns = [
    path('connect/', include('sundevilconnect.urls')),
    path('admin/', admin.site.urls),
    path('auth/jwt/create/', TokenCreateView.as_view(), name='jwt_create'),
    path('auth/jwt/refresh/', TokenRefreshView.as_view(), name='jwt_refresh'),
    path('auth/jwt/verify/', TokenVerifyView.as_view(), name='jwt_verify'),
    path('auth/', include('djoser.urls')),
]
