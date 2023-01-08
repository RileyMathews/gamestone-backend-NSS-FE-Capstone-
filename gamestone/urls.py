from django.urls import path
from .views import GamesView, SuggestGamesView, SearchGamesView

urlpatterns = [
    path('', GamesView.as_view(), name="games_view"),
    path('suggest-games', SuggestGamesView.as_view(), name="suggest_games_view"),
    path('search-games', SearchGamesView.as_view(), name="search_games_view"),
]
