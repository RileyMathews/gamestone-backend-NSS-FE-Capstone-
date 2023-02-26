from django.test import TestCase
from .factories.game_template_factory import game_template_factory
from resource_tracker.models import PlayerResourceTemplate, GameInstance, GamePlayer

class PlayerResourceTemplateTestCase(TestCase):

    def setUp(self):
        self.game_template = game_template_factory()

    def test_can_create_player_resource_template(self):
        resource_template = PlayerResourceTemplate.objects.create(
            name="test", game_template=self.game_template,
        )
        db_resource_template = PlayerResourceTemplate.objects.get(
            id=resource_template.id
        )

        self.assertEqual(resource_template.name, db_resource_template.name)

    def test_can_create_with_existing_game_instance(self):
        game_instance = GameInstance.objects.create(
            name="test", owner=self.game_template.owner, game_template=self.game_template
        )
        game_instance.add_player(game_instance.owner)

        resource_template = PlayerResourceTemplate.objects.create(
            name="test template", game_template=self.game_template
        )

        game_player = GamePlayer.objects.filter(game_instance=game_instance)[0]
        player_resource_instance = game_player.player_resource_instances.all()[0]
        self.assertEqual(player_resource_instance.resource_template, resource_template)
