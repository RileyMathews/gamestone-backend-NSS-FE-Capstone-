from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import viewsets

from . import views
from . import htmx_views


router = DefaultRouter()

router.register("player-resource-instances", viewsets.PlayerResourceInstanceViewset)


urlpatterns = [
    path("api/", include(router.urls)),
    path("", views.index, name="resource-tracker-index"),
    path(
        "game-templates/create/",
        views.game_template_create,
        name="game-template-create",
    ),
    path(
        "game-templates/<uuid:id>/",
        views.game_template_detail,
        name="game-template-detail",
    ),
    path(
        "game-templates/<uuid:id>/delete",
        views.game_template_delete,
        name="game-template-delete",
    ),
    path(
        "game-templates/<uuid:game_template_id>/resource-groups-edit",
        views.player_resource_group_edit,
        name="game-template-player-resource-groups-edit"
    ),
    path(
        "game-templates/<uuid:id>/player-resources-edit",
        views.game_template_player_resources_edit,
        name="game-template-player-resources-edit",
    ),
    path(
        "game-templates/<uuid:game_template_id>/create-instance",
        views.game_instance_create,
        name="game-instance-create",
    ),
    path("player-character/create", views.player_create, name="player-create"),
    path(
        "game-instance/<uuid:id>/",
        views.game_instance_detail,
        name="game-instance-detail",
    ),
    path(
        "game-instance/<uuid:id>/play",
        views.game_instance_play,
        name="game-instance-play",
    ),
    path(
        "game-instance/<uuid:id>/play-htmx",
        views.game_instance_play_htmx,
        name="game-instance-play-htmx",
    ),
    path(
        "game-instance/<uuid:id>/delete",
        views.game_instance_delete,
        name="game-instance-delete",
    ),
    path(
        "game-instance/search", views.game_instance_search, name="game-instance-search"
    ),
    path(
        "game-instance/<str:join_code>/join", views.join_game, name="game-instance-join"
    ),
    path(
        "game-templates/<uuid:game_template_id>/special-dice/create",
        views.special_die_create,
        name="special-die-create",
    ),
    path(
        "special-dice/<uuid:id>/edit", views.special_die_edit, name="special-die-edit"
    ),
    path(
        "special-dice/<uuid:id>/edit-faces",
        views.special_die_faces_edit,
        name="special-die-faces-edit",
    ),
    path(
        "special-die-face/<uuid:id>/delete",
        views.special_die_faces_delete,
        name="special-die-faces-delete",
    ),
    path(
        "die/<uuid:id>/delete",
        views.die_delete,
        name="die-delete",
    ),
    path(
        "game-instance/<uuid:game_instance_id>/edit-player-resources",
        views.player_hidden_resources_edit,
        name="player-hidden-resources-edit",
    ),
    path(
        "htmx/<uuid:game_instance_id>/<uuid:die_id>/<int:number_to_roll>/roll/",
        htmx_views.roll_dice_hx,
        name="htmx-roll-dice",
    ),
    path(
        "htmx/<uuid:game_instance_id>/archive-rolls",
        htmx_views.archive_rolls_hx,
        name="archive-rolls",
    ),
    path(
        "htmx/resources/<uuid:id>/edit",
        htmx_views.resource_instance_edit_hx,
        name="resource-instance-edit-hx",
    ),
    path(
        "htmx/resources/<uuid:id>/",
        htmx_views.resource_instance_hx,
        name="resource-instance-hx"
    )
]
