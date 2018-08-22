from django.db import models
from .user import User

""" 
    module: user games model
    author: riley mathews
    purpose: to create the user games model
"""

class UserGame(models.Model):
    """ model for user games """
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    isFavorited = models.BooleanField()
    gbId = models.IntegerField()
    progress = models.CharField(max_length=255)