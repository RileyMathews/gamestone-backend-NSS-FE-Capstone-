from django.contrib import admin
from .models import Platform, UserGame, UserPlatform
# Register your models here.


admin.site.register(Platform)
admin.site.register(UserGame)
admin.site.register(UserPlatform)