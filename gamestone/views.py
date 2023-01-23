from django.http import JsonResponse
from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.conf import settings
from urllib.parse import urlencode
import requests
import json


class GamesView(LoginRequiredMixin, TemplateView):
    template_name = "gamestone/games.html"


class SearchGamesView(LoginRequiredMixin, TemplateView):
    template_name = "gamestone/search_games.html"


class SuggestGamesView(LoginRequiredMixin, TemplateView):
    template_name = "gamestone/suggest_games.html"


class GiantbombProxyView(View):
    giantbomb_api_root = "https://giantbomb.com/api"
    giantbomb_api_path = ""
    default_query_params = {"format": "json", "api_key": settings.GIANTBOMB_API_KEY}

    def get(self, request, *args, **kwargs):
        url = self.get_full_url(request, *args, **kwargs)
        giantbomb_response = requests.get(url, headers={"User-Agent": "Gamestone App"})

        return JsonResponse(json.loads(giantbomb_response.content))

    def get_all_query_params(self, request):
        return {**self.default_query_params, **request.GET.dict()}

    def get_url_query(self, request):
        return urlencode(self.get_all_query_params(request))

    def get_full_url(self, request, *args, **kwargs):
        return f"{self.giantbomb_api_root}{self.get_api_path(request, *args, **kwargs)}?{self.get_url_query(request)}"

    def get_api_path(self, request, *args, **kwargs):
        return self.giantbomb_api_path


class GiantbombSearchProxyView(GiantbombProxyView, LoginRequiredMixin):
    giantbomb_api_path = "/search"


class GiantbombGameProxyView(GiantbombProxyView, LoginRequiredMixin):
    def get_api_path(self, request, *args, **kwargs):
        return f"/game/3030-{kwargs['id']}"


class GiantbombCompanyProxyView(GiantbombGameProxyView, LoginRequiredMixin):
    def get_api_path(self, request, *args, **kwargs):
        return f"/company/3010-{kwargs['id']}"
