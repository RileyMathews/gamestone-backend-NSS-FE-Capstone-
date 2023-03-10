from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_demo_user = models.BooleanField(default=False)
    pass
