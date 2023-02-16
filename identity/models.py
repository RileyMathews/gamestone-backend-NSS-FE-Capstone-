from django.db import models
from django.contrib.auth.models import AbstractUser

from resource_tracker.models import Player


class User(AbstractUser):
    player: models.BaseManager[Player]
