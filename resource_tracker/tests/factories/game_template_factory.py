from resource_tracker.models import GameTemplate

from .user_factory import UserFactory

import factory


class GameTemplateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = GameTemplate

    owner = factory.SubFactory(UserFactory)
    name = factory.Faker("name")
