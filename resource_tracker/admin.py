from django.contrib import admin
from . import models

admin.site.register(models.GameTemplate)
admin.site.register(models.PlayerResourceTemplate)
admin.site.register(models.GameInstance)
admin.site.register(models.PlayerResourceInstance)
admin.site.register(models.GamePlayer)
