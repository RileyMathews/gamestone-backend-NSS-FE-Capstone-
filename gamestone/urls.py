from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import views as APIViews
from .views import GamesView, SuggestGamesView, SearchGamesView

api_router = DefaultRouter()
api_router.register('user', APIViews.UserViewset, basename='user')
api_router.register('usergame', APIViews.UserGameViewset)

urlpatterns = [
    path('', GamesView.as_view(), name="games_view"),
    path('suggest-games', SuggestGamesView.as_view(), name="suggest_games_view"),
    path('search-games', SearchGamesView.as_view(), name="search_games_view"),
    path('api/', include(api_router.urls)),
]
