from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """ class to create user model """
    gamertag=models.CharField(max_length=255)

    def __str__(self):
        return f'{self.username}: {self.first_name} {self.last_name}'