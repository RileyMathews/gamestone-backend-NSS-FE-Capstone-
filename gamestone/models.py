from django.db import models
from django.conf import settings


class UserGame(models.Model):
    """model for user games"""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="games"
    )
    isFavorited = models.BooleanField()
    giantbomb_game = models.IntegerField()

    def __str__(self):
        return f"gb game {self.giantbomb_game}"
