from django.db import models
from django.conf import settings


class Platform(models.Model):
    """ class to create platform model """
    name=models.CharField(max_length=255)
    company=models.CharField(max_length=255)
    abreviation=models.CharField(max_length=255)
    giant_bomb_id=models.IntegerField()
    users=models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserPlatform', related_name='platforms')

    def __str__(self):
        return f'{self.name}'