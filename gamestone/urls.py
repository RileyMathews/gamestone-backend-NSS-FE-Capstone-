from django.urls import path
from .views import GamesView

urlpatterns = [
    path('', GamesView.as_view(), name="gamestone_app"),
]
