from rest_framework_nested import routers

from .views import ClubViewSet, EventViewSet

router = routers.DefaultRouter()

router.register('clubs', ClubViewSet, basename='clubs')
router.register('events', EventViewSet, basename='events')

urlpatterns = router.urls