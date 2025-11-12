from rest_framework_nested import routers

from .views import RegisterUserViewSet, ClubViewSet, EventViewSet

router = routers.DefaultRouter()

router.register('clubs', ClubViewSet, basename='clubs')
router.register('events', EventViewSet, basename='events')
router.register('register', RegisterUserViewSet, basename='register')

urlpatterns = router.urls