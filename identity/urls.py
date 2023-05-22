from django.urls import path

from . import views

urlpatterns = [
    path("temporary-user", views.temporary_user_create, name="temporary-user-create")
]
