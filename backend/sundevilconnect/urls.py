from rest_framework_nested import routers

from .views import ClubViewSet, EventViewSet

router = routers.DefaultRouter()
router.register('clubs', ClubViewSet)
router.register('events', EventViewSet)