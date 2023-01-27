from django.contrib import admin
from .models import OpenIDIdentity, OpenIDProvider

# Register your models here.
admin.register(OpenIDProvider)
admin.register(OpenIDIdentity)
