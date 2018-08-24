from django.db import models
from django.contrib.auth.models import AbstractUser
from .platform import Platform


class User(AbstractUser):
    """ class to create user model """
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    gamertag=models.CharField(max_length=255)
    password=models.CharField(max_length=255)
    platforms=models.ManyToManyField(Platform, through='UserPlatform', related_name='platforms')

    def __str__(self):
        return f'{self.gamertag}'