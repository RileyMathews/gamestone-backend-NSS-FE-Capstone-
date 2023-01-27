from django.urls import path

from . import views

urlpatterns = [
    path("<slug:slug>", views.index, name="index"),
    path("<slug:slug>/login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("<slug:slug>/callback", views.callback, name="callback"),
]
