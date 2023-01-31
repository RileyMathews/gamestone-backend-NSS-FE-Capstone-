from django.conf import settings
from django.db import models
from model_utils.models import UUIDModel
# Create your models here.

class Player(UUIDModel):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Resource(UUIDModel):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    current_ammount = models.IntegerField(default=0)
    max_ammount = models.IntegerField(default=2147483647)
    min_ammount = models.IntegerField(default=-2147483647)

    def __str__(self):
        return self.name
