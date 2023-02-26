from django.contrib.auth import get_user_model
from django.test import TestCase, RequestFactory
from resource_tracker import views
from django.urls import reverse
import uuid


class TestPlayerCreate(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = get_user_model().objects.create_user(uuid.uuid4())

    def test_player_create(self):
        url = reverse("player-create")
        request = self.factory.get(url)
        request.user = self.user

        response = views.player_create(request)

        self.assertEqual(response.status_code, 200)

        post_request = self.factory.post(f"{url}?next=/foo", {"name": "test"})
        post_request.user = self.user

        post_response = views.player_create(post_request)

        self.assertEqual(post_response.status_code, 302)
        self.assertEqual(post_response.headers['Location'], "/foo")
