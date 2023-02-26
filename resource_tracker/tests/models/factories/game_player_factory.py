from .game_instance_factory import game_instance_factory
from resource_tracker.models import GamePlayer

def game_player_factory():
    game_instance = game_instance_factory()
    game_instance.add_player(game_instance.owner)
    return GamePlayer.objects.get(
        game_instance=game_instance,
        player=game_instance.owner
    )

