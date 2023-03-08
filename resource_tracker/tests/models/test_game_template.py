from django.test import TestCase
from resource_tracker.models import GameTemplate
from ..factories.user_factory import UserFactory

class GameTemplateTestCase(TestCase):

    def setUp(self):
        self.player = UserFactory.create()

    def test_can_create_game_template(self):
        game_template = GameTemplate.objects.create(
            owner=self.player, name="test game template"
        )
        db_game_template = GameTemplate.objects.get(
            id=game_template.id
        )

        self.assertEqual(game_template.name, db_game_template.name)
        self.assertEqual(game_template.owner, self.player)
