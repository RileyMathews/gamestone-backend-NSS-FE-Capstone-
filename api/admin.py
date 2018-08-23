from django.contrib import admin
from .models import Platform, User, UserGame, UserPlatform
# Register your models here.


admin.site.register(Platform)
admin.site.register(User)
admin.site.register(UserGame)
admin.site.register(UserPlatform)