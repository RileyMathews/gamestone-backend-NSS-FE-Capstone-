from .base import *  # noqa
from .base import get_env_variable
import dj_database_url

SECRET_KEY = "django-insecure-c#$brf2w_vej*bl=4$+&0pbh7tai7+l-#!1j-*56-kt7@$%n#2"
DEBUG = True

ALLOWED_HOSTS = ["*"]

DATABASES = {
    "default": dj_database_url.parse("postgres://user:password@database:5432/database")
}

GIANTBOMB_API_KEY = get_env_variable("GIANTBOMB_API_KEY")

if DEBUG:
    import socket  # only if you haven't already imported this
    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + ["127.0.0.1", "10.0.2.2"]

DEBUG_TOOLBAR_CONFIG = {
    "ROOT_TAG_EXTRA_ATTRS": "hx-preserve"
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
