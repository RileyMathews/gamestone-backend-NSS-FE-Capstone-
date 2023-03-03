from resource_tracker.models import Player
from .user_factory import UserFactory

import factory

class PlayerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Player

    user = factory.SubFactory(UserFactory)
    name = factory.Faker("name")

    
