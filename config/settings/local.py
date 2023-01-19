from .base import *
import dj_database_url

SECRET_KEY = "django-insecure-c#$brf2w_vej*bl=4$+&0pbh7tai7+l-#!1j-*56-kt7@$%n#2"
DEBUG = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)

ALLOWED_HOSTS = ["*"]

DATABASES = {
    'default': dj_database_url.parse("postgres://user:password@database:5432/database")
}

GIANTBOMB_API_KEY = get_env_variable("GIANTBOMB_API_KEY")
