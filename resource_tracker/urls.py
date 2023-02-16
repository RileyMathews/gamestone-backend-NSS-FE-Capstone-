from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import viewsets

from . import views



router = DefaultRouter()

router.register("player-resource-instances", viewsets.PlayerResourceInstanceViewset)


urlpatterns = [
    path("api/", include(router.urls)),
    path("", views.index, name="resource-tracker-index"),
    path("game-templates/create/", views.game_template_create, name="game-template-create"),
    path("game-templates/<uuid:id>/", views.game_template_detail, name="game-template-detail"),
    path("game-templates/<uuid:id>/delete", views.game_template_delete, name="game-template-delete"),
    path("game-templates/<uuid:game_template_id>/add-resource", views.player_resource_template_create, name="player-resource-template-create"),
    path("game-templates/<uuid:game_template_id>/resources/<uuid:id>/delete", views.player_resource_template_delete, name="player-resource-template-delete"),
    path("game-templates/<uuid:game_template_id>/resources/<uuid:id>/edit", views.player_resource_template_edit, name="player-resource-template-edit"),
    path("game-templates/<uuid:game_template_id>/create-instance", views.game_instance_create, name="game-instance-create"),
    path("player-character/create", views.player_create, name="player-create"),
    path("game-instance/<uuid:id>/", views.game_instance_detail, name="game-instance-detail"),
    path("game-instance/<uuid:id>/play", views.game_instance_play, name="game-instance-play"),
    path("game-instance/<uuid:id>/delete", views.game_instance_delete, name="game-instance-delete"),
    path("game-instance/search", views.game_instance_search, name="game-instance-search"),
    path("game-instance/<str:join_code>/join", views.join_game, name="game-instance-join"),
    path("game-templates/<uuid:game_template_id>/special-dice/create", views.special_die_create, name="special-die-create"),
    path("special-dice/<uuid:id>/edit", views.special_die_edit, name="special-die-edit"),
    path("special-dice/<uuid:id>/edit-faces", views.special_die_faces_edit, name="special-die-faces-edit"),
    path("special-die-face/<uuid:id>/delete", views.special_die_faces_delete, name="special-die-faces-delete"),
    path("game-instance/<uuid:game_instance_id>/edit-player-resources", views.player_hidden_resources_edit, name="player-hidden-resources-edit"),
]
