from django.contrib import admin
from . import models

admin.site.register(models.Player)
admin.site.register(models.GameTemplate)
admin.site.register(models.PlayerResourceTemplate)
admin.site.register(models.GameResourceTemplate)
admin.site.register(models.GameInstance)
admin.site.register(models.GameResourceInstance)
admin.site.register(models.PlayerResourceInstance)
