from rest_framework_nested import routers

from .views import ClubViewSet, ClubContentViewSet, ClubEventViewSet, EventViewSet

router = routers.DefaultRouter()

router.register('clubs', ClubViewSet)
clubs_router = routers.NestedDefaultRouter(router, 'clubs', lookup='club')
clubs_router.register('content', ClubContentViewSet, basename='club-content')
clubs_router.register('events', ClubEventViewSet, basename='club-events')

router.register('events', EventViewSet, basename='events')

urlpatterns = router.urls + clubs_router.urls