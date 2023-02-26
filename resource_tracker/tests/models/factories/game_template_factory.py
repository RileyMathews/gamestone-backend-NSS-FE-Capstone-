from resource_tracker.models import Player, GameTemplate
from django.contrib.auth import get_user_model

from .player_factory import player_factory

def game_template_factory():
    player = player_factory()
    game_template = GameTemplate.objects.create(
        owner=player, name="Test Game Template"
    )
    return game_template
