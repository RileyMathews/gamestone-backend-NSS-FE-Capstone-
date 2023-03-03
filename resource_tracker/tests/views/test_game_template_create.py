from django.test import TestCase, RequestFactory
from resource_tracker import views
from django.urls import reverse

from resource_tracker.models import GameTemplate

from ..factories.player_factory import PlayerFactory


class TestGameTemplateCreate(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.player = PlayerFactory.create()

    def test_game_template_create(self):
        url = reverse("game-template-create")
        request = self.factory.get(url)
        request.user = self.player.user

        response = views.game_template_create(request)

        self.assertEqual(response.status_code, 200)

        post_request = self.factory.post(f"{url}?next=/foo", {"name": "test"})
        post_request.user = self.player.user

        post_response = views.game_template_create(post_request)

        game_template = GameTemplate.objects.filter(owner=self.player).first()

        self.assertEqual(game_template.name, "test")
        self.assertEqual(post_response.status_code, 302)
        self.assertTrue(post_response.headers['Location'], f"/resource-tracker/game-templates/{game_template.id}")
