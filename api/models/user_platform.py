from django.db import models
from django.conf import settings
from .platform import Platform

""" 
    module: user platform
    author: riley mathews
    purpose: to create the relationship table between users and platforms
"""

class UserPlatform(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)