from django import setup
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
setup()
