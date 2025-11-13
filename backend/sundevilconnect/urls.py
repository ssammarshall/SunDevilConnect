from rest_framework_nested import routers

from .views import ClubViewSet, ClubContentViewSet, EventViewSet

router = routers.DefaultRouter()

router.register('clubs', ClubViewSet)
clubs_router = routers.NestedDefaultRouter(router, 'clubs', lookup='club')
clubs_router.register('content', ClubContentViewSet, basename='club-content')

router.register('events', EventViewSet, basename='events')

urlpatterns = router.urls + clubs_router.urls