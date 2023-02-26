from resource_tracker.models import Player
from django.contrib.auth import get_user_model
import uuid

def player_factory():
    user = get_user_model().objects.create_user(uuid.uuid4())
    return Player.objects.create(user=user, name="test player")
