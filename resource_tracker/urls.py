from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import viewsets
from . import views

router = DefaultRouter()

router.register("players", viewsets.PlayerViewSet)
router.register("resources", viewsets.ResourceViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("", views.ListPlayersView.as_view(), name="player_list"),
    path("players/<uuid:pk>/", views.PlayerDetailView.as_view(), name="player_detail"),
    path("players/<uuid:pk>/confirm-delete/", views.PlayerDeleteView.as_view(), name="player_delete"),
    path("players/<uuid:player_id>/resources/create/", views.ResourceCreateView.as_view(), name="resource_create"),
]
