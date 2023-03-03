import factory

from resource_tracker.models import RollLog
from .game_player_factory import GamePlayerFactory


class RollLogFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = RollLog

    game_player = factory.SubFactory(GamePlayerFactory)
