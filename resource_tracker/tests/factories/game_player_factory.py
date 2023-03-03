import factory
from resource_tracker.models import GamePlayer
from .game_instance_factory import GameInstanceFactory
from .player_factory import PlayerFactory

class GamePlayerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = GamePlayer

    game_instance = factory.SubFactory(GameInstanceFactory)
    player = factory.SubFactory(PlayerFactory)
