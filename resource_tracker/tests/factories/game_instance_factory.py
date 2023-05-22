import factory
from resource_tracker.models import GameInstance
from .game_template_factory import GameTemplateFactory
from .user_factory import UserFactory


class GameInstanceFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = GameInstance

    name = factory.Faker("name")
    game_template = factory.SubFactory(GameTemplateFactory)
    owner = factory.SubFactory(UserFactory)
