from django.test import TestCase
from resource_tracker.models import GameTemplate, Player
from django.contrib.auth import get_user_model
from uuid import uuid4

class GameTemplateTestCase(TestCase):

    def setUp(self):
        user = get_user_model().objects.create_user(uuid4())
        self.player = Player.objects.create(user=user, name="test")

    def test_can_create_game_template(self):
        game_template = GameTemplate.objects.create(
            owner=self.player, name="test game template"
        )
        db_game_template = GameTemplate.objects.get(
            id=game_template.id
        )

        self.assertEqual(game_template.name, db_game_template.name)
