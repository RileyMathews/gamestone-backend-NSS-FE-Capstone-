from django.db import models
from django.conf import settings
import uuid

# Create your models here.
class PlayerCharacter(models.Model):
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    uuid = models.UUIDField(default=uuid.uuid4)
    soul_gems = models.PositiveIntegerField()
    plants = models.PositiveIntegerField()
    experience = models.PositiveIntegerField()
    septims = models.PositiveIntegerField()
    ore = models.PositiveIntegerField()
