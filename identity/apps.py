from django.apps import AppConfig
from django.contrib.auth.signals import user_logged_out

def delete_temporary_user_on_logout(**kwargs):
    user = kwargs.get('user', None)
    print(user)
    if user and user.is_temporary:
        user.delete()

class IdentityConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'identity'

    def ready(self):
        user_logged_out.connect(delete_temporary_user_on_logout)
