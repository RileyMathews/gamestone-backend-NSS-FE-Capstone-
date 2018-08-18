from django.db import models


class User(models.Model):
    """ class to create user model """
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    gamertag=models.CharField(max_length=255)
    password=models.CharField(max_length=255)

    def __str__(self):
        return f'{self.gamertag}'