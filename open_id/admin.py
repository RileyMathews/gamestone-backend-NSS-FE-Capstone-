from django.contrib import admin
from .models import OpenIDIdentity, OpenIDProvider

# Register your models here.
admin.site.register(OpenIDProvider)
admin.site.register(OpenIDIdentity)
