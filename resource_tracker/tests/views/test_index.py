from django.contrib.auth import get_user_model
from django.test import TestCase, RequestFactory
from resource_tracker import views
from django.urls import reverse
import uuid

from ..factories.game_instance_factory import GameInstanceFactory, GameTemplateFactory


class TestIndex(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.game_template = GameTemplateFactory.create()
        self.game_instance = GameInstanceFactory.create(
            owner = self.game_template.owner,
            game_template = self.game_template
        )
        self.game_instance.add_player(self.game_instance.owner)

    def test_index(self):
        url = reverse("resource-tracker-index")
        request = self.factory.get(url)
        request.user = self.game_template.owner.user

        response = views.index(request)


        context = response.context_data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            context["game_templates"].first().id, self.game_instance.game_template.id
        )
        self.assertEqual(
            context["owned_game_instances"].first().id, self.game_instance.id
        )
        self.assertEqual(
            context["playing_game_instances"].first().id, self.game_instance.id
        )
        self.assertEqual(
            context["game_instance_search_url"], reverse('game-instance-search')
        )
        self.assertEqual(
            context["game_template_create_url"], reverse('game-template-create')
        )
