from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """ class to create user model """
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    gamertag=models.CharField(max_length=255)
    password=models.CharField(max_length=255)
    is_temporary=models.BooleanField(default=False)

    def __str__(self):
        return f'{self.username}: {self.first_name} {self.last_name}'
