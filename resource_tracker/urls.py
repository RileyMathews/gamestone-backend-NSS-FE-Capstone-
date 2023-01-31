from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import viewsets

router = DefaultRouter()

router.register("players", viewsets.PlayerViewSet)
router.register("resources", viewsets.ResourceViewSet)

urlpatterns = [
    path("api/", include(router.urls))
]
