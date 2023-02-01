from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import viewsets
from . import views

router = DefaultRouter()

router.register("players", viewsets.PlayerViewSet)
router.register("resources", viewsets.ResourceViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("", views.player_list, name="player_list"),
    path("players/<uuid:pk>/", views.player_detail, name="player_detail"),
    path("players/<uuid:pk>/confirm-delete/", views.player_delete, name="player_delete"),
    path("players/<uuid:player_id>/add-resource/", views.resource_create, name="resource_create"),
    path("resources/<uuid:pk>/delete", views.resource_delete, name="resource_delete")
]
