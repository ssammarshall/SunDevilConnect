from django.contrib import admin
from django.urls import include, path

from .views import TokenCreateView

urlpatterns = [
    path('connect/', include('sundevilconnect.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("auth/jwt/create/", TokenCreateView.as_view(), name="jwt_create")
]
