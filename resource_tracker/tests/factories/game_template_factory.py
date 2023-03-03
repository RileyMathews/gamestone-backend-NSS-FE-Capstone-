from resource_tracker.models import GameTemplate

from .player_factory import PlayerFactory

import factory


class GameTemplateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = GameTemplate

    owner = factory.SubFactory(PlayerFactory)
    name = factory.Faker("name")
