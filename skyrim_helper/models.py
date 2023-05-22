from django.db import models
from django.conf import settings
import uuid


class PlayerCharacter(models.Model):
    player = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="player_characters",
    )
    name = models.CharField(max_length=255)
    uuid = models.UUIDField(default=uuid.uuid4)
    soul_gems = models.PositiveIntegerField(default=0)
    plants = models.PositiveIntegerField(default=0)
    experience = models.PositiveIntegerField(default=0)
    septims = models.PositiveIntegerField(default=0)
    ore = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name
