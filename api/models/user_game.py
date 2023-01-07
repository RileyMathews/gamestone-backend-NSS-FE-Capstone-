from django.db import models
from django.conf import settings

""" 
    module: user games model
    author: riley mathews
    purpose: to create the user games model
"""

class UserGame(models.Model):
    """ model for user games """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='games')
    isFavorited = models.BooleanField()
    gbId = models.IntegerField()

    def __str__(self):
        return f'gb game {self.gbId}'
