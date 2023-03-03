from django.test import TestCase
from resource_tracker.models import Player
from ..factories.user_factory import UserFactory


class PlayerTestCase(TestCase):
    def test_can_create_player(self):
        player = Player.objects.create(user=UserFactory.create(), name="test name")
        db_player = Player.objects.get(id=player.id)

        self.assertEqual(db_player.name, "test name")
