from django.db import models


class Platform(models.Model):
    """ class to create platform model """
    name=models.CharField(max_length=255)
    company=models.CharField(max_length=255)
    abreviation=models.CharField(max_length=255)
    gbId=models.IntegerField()

    def __str__(self):
        return f'{self.name}'