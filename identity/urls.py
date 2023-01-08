from django.urls import path
from .views import TemporaryUserLogin

urlpatterns = [
    path("login/", TemporaryUserLogin.as_view(), name="temporary_login")
]
