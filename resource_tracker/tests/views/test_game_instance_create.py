from django.test import TestCase, RequestFactory
from resource_tracker import views
from django.urls import reverse

from resource_tracker.models import GameTemplate

from ..factories.game_template_factory import GameTemplateFactory
from ..factories.game_instance_factory import GameInstanceFactory


class TestGameInstanceCreate(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_game_instance_create(self):
        template = GameTemplateFactory.create()
        user = template.owner
        url = reverse("game-instance-create", args=[template.id])

        get_request = self.factory.get(url)
        get_request.user = user

        get_response = views.game_instance_create(get_request, template.id)

        self.assertEqual(get_response.status_code, 200)
        self.assertEqual(get_response.context_data["title"], f"Create game room for {template.name}")

        post_request = self.factory.post(url, {"name": "test game instance name"})
        post_request.user = user

        post_response = views.game_instance_create(post_request, template.id)

        self.assertEqual(post_response.status_code, 302)
        
