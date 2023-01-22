from django.urls import path
from .views import TemporaryUserLogin, LogoutView

app_name = "identity"

urlpatterns = [
    path("login/", TemporaryUserLogin.as_view(), name="temporary_login"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
