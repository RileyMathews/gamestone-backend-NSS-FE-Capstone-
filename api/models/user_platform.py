from django.db import models
from .user import User
from .platform import Platform

""" 
    module: user platform
    author: riley mathews
    purpose: to create the relationship table between users and platforms
"""

class UserPlatform(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)