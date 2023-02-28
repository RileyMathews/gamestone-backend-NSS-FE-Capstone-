from django.test import TestCase, RequestFactory
from resource_tracker import views
from django.urls import reverse

from resource_tracker.models import GameTemplate

from ..models.factories.game_template_factory import game_template_factory


class TestGameTemplateCreate(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.template = game_template_factory()
        self.user = self.template.owner.user

    def test_game_template_create(self):
        url = reverse("game-template-detail", args=[self.template.id])
        request = self.factory.get(url)
        request.user = self.user

        response = views.game_template_create(request)

        self.assertEqual(response.status_code, 200)
        
