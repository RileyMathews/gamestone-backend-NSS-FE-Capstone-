from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import views as APIViews
from .views import (
    GamesView,
    SuggestGamesView,
    SearchGamesView,
    GiantbombSearchProxyView,
    GiantbombGameProxyView,
    GiantbombCompanyProxyView,
)

api_router = DefaultRouter()
api_router.register("user", APIViews.UserViewset, basename="user")
api_router.register("usergame", APIViews.UserGameViewset)

urlpatterns = [
    path("", GamesView.as_view(), name="games"),
    path("suggest-games", SuggestGamesView.as_view(), name="suggest"),
    path("search-games", SearchGamesView.as_view(), name="search"),
    path("api/", include(api_router.urls)),
    path("api/giantbomb-proxy/search", GiantbombSearchProxyView.as_view()),
    path("api/giantbomb-proxy/game/<int:id>", GiantbombGameProxyView.as_view()),
    path("api/giantbomb-proxy/company/<int:id>", GiantbombCompanyProxyView.as_view()),
]
