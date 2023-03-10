from django.apps import AppConfig
from django.contrib.auth.signals import user_logged_out


def delete_demo_user_on_logout(sender, **kwargs):
    user = kwargs["user"]
    if user.is_demo_user:
        user.delete()


class GamestoneConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "gamestone"

    def ready(self):
        user_logged_out.connect(delete_demo_user_on_logout)
