from django.test import TestCase
from resource_tracker.models import (
    GameTemplate,
    GameInstance,
    PlayerResourceTemplate,
    GamePlayer,
)
from ..factories.user_factory import UserFactory


class GameInstanceTestCase(TestCase):
    def setUp(self):
        self.owning_player = UserFactory.create()
        self.player_two = UserFactory.create()
        self.player_three = UserFactory.create()
        self.game_template = GameTemplate.objects.create(
            owner=self.owning_player, name="test template"
        )

    def test_can_create_game_instance(self):
        game_instance = GameInstance.objects.create(
            game_template=self.game_template, owner=self.game_template.owner
        )
        db_game_instance = GameInstance.objects.get(id=game_instance.id)
        self.assertEqual(game_instance.id, db_game_instance.id)

    def test_add_players_with_existing_resource_templates(self):
        game_instance = GameInstance.objects.create(
            game_template=self.game_template, owner=self.game_template.owner
        )
        PlayerResourceTemplate.objects.create(
            name="test",
            game_template=game_instance.game_template,
        )

        game_instance.add_player(self.player_two)

        PlayerResourceTemplate.objects.create(
            name="resource two",
            game_template=game_instance.game_template,
        )

        game_instance.add_player(self.player_three)

        game_players = GamePlayer.objects.filter(game_instance=game_instance)

        for game_player in game_players:
            self.assertEqual(len(game_player.player_resource_instances.all()), 2)
