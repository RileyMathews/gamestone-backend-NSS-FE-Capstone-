from django.test import TestCase, RequestFactory
from resource_tracker import views
from django.urls import reverse

from resource_tracker.models import GameTemplate

from ..factories.game_template_factory import GameTemplateFactory
from ..factories.game_instance_factory import GameInstanceFactory


class TestGametemplateDelete(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_game_template_delete(self):
        template = GameTemplateFactory.create()
        user = template.owner.user
        url = reverse("game-template-delete", args=[template.id])
        request = self.factory.get(url)
        request.user = user

        response = views.game_template_delete(request, template.id)

        self.assertEqual(response.status_code, 200)
        self.assertIn(template.name, response.context_data["prompt"])

        post_request = self.factory.post(url)
        post_request.user = user

        post_response = views.game_template_delete(post_request, template.id)

        self.assertEqual(post_response.status_code, 302)

        template_queryset = GameTemplate.objects.filter(id=template.id)
        
        self.assertEqual(len(template_queryset), 0)
        
    def test_when_active_games_gives_extra_warning(self):
        template = GameTemplateFactory.create()
        GameInstanceFactory.create(game_template=template)
        user = template.owner.user
        url = reverse("game-template-delete", args=[template.id])

        request = self.factory.get(url)
        request.user = user

        response = views.game_template_delete(request, template.id)

        self.assertIn("Warning there are 1 games with this template.", response.context_data["prompt"])
