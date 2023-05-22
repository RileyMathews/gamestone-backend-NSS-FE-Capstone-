import factory
from resource_tracker.models import GamePlayer
from .game_instance_factory import GameInstanceFactory
from .user_factory import UserFactory


class GamePlayerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = GamePlayer

    game_instance = factory.SubFactory(GameInstanceFactory)
    player = factory.SubFactory(UserFactory)
