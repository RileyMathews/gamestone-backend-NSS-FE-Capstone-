from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.conf import settings
from urllib.parse import urlencode
import requests
import json

# Create your views here.
class GamesView(LoginRequiredMixin, TemplateView):
    template_name = "gamestone/games.html"

class SearchGamesView(LoginRequiredMixin, TemplateView):
    template_name = "gamestone/search_games.html"

class SuggestGamesView(LoginRequiredMixin, TemplateView):
    template_name = "gamestone/suggest_games.html"

class GiantbombProxyView(View):
    giantbomb_api_root = "https://giantbomb.com/api"
    giantbomb_api_path = ""
    default_query_params = {
        "format": "json",
        "api_key": settings.GIANTBOMB_API_KEY
    }

    def get(self, request):
        url = self.get_full_url(request)
        giantbomb_response = requests.get(
            url,
            headers = {
                "User-Agent": "Gamestone App"
            }
        )

        return JsonResponse(json.loads(giantbomb_response.content))

    def get_all_query_params(self, request):
        return { **self.default_query_params, **request.GET.dict()}

    def get_url_query(self, request):
        return urlencode(self.get_all_query_params(request))

    def get_full_url(self, request):
        return f"{self.giantbomb_api_root}{self.giantbomb_api_path}?{self.get_url_query(request)}"

class GiantbombSearchProxyView(GiantbombProxyView):
    giantbomb_api_path = "/search"
