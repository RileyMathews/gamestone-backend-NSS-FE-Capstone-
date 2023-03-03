import factory
from resource_tracker.models import GameInstance
from .game_template_factory import GameTemplateFactory
from .player_factory import PlayerFactory


class GameInstanceFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = GameInstance

    name = factory.Faker("name")
    game_template = factory.SubFactory(GameTemplateFactory)
    owner = factory.SubFactory(PlayerFactory)
    
