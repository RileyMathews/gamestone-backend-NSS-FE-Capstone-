from resource_tracker.models import RollLog
from .game_player_factory import game_player_factory

def roll_log_factory():
    return RollLog.objects.create(
        game_player=game_player_factory()
    )
