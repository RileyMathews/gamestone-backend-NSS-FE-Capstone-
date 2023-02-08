from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from authlib.integrations.django_client import OAuth
from authlib.integrations.django_client.apps import DjangoOAuth2App
from authlib.integrations.django_client.integration import DjangoIntegration
from urllib.parse import quote_plus, urlencode

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

    def logout_url(self):
        return f"{self.server_host}{self.logout_path}?" + urlencode(
            self.logout_params,
            quote_via=quote_plus
        )


class OpenIDIdentity(models.Model):
    subject_identifier = models.CharField(max_length=256)
    provider = models.ForeignKey(OpenIDProvider, on_delete=models.CASCADE, related_name="identities")
    # TODO: add ability for a user to have multiple open id connections
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="open_id_identity")

    @classmethod
    def get_or_create_identity(cls, sub, provider):
        identities = cls.objects.filter(
            subject_identifier = sub, provider=provider
        )
        if len(identities) > 1:
            raise Exception("more than one identity found for sub")

        if len(identities) == 1:
            return identities[0]

        new_user = get_user_model().objects.create(
            username=sub
        )
        new_identity = cls.objects.create(
            subject_identifier=sub,
            provider=provider,
            user=new_user,
        )
        return new_identity
