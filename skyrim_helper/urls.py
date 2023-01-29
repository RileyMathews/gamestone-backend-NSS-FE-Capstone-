from rest_framework import routers
from django.urls import path, include

from .api.viewsets import PlayerCharacterViewset
from . import views

router = routers.DefaultRouter()
router.register("player-characters", PlayerCharacterViewset)

urlpatterns = [
    path("api/", include(router.urls)),
    path("", views.ListCharactersView.as_view(), name="player_characters_list"),
    path("<uuid:uuid>", views.PlayerCharacterDetailView.as_view(), name="player_character_detail"),
    path("<uuid:uuid>/delete/", views.PlayerCharacterDeleteView.as_view(), name="player_characters_delete"),
]
