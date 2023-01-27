from django.db import models
from django.conf import settings
from authlib.integrations.django_client import OAuth
from authlib.integrations.django_client.apps import DjangoOAuth2App
from authlib.integrations.django_client.integration import DjangoIntegration

# Create your models here.

class OpenIDProvider(models.Model):
    slug = models.SlugField(max_length=50)
    display_name = models.CharField(max_length=256)
    client_id = models.CharField(max_length=256)
    client_secret = models.CharField(max_length=256)
    server_host = models.URLField()
    logout_path = models.CharField(max_length=256, blank=True)
    logout_params = models.JSONField(default=dict)

    def openid_client(self) -> DjangoOAuth2App:
        return DjangoOAuth2App(
            DjangoIntegration(self.slug),
            self.slug,
            client_id=self.client_id,
            client_secret=self.client_secret,
            client_kwargs={
                "scope": "openid profile email"
            },
            server_metadata_url=f"{self.server_host}/.well-known/openid-configuration"
        )


class OpenIDIdentity(models.Model):
    provider = models.ForeignKey(OpenIDProvider, on_delete=models.CASCADE, related_name="identities")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="open_id_identities")
    currently_logged_in = models.BooleanField()
