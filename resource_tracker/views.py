from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import DeleteView, DetailView
from django.http import HttpRequest
from django.contrib.auth.mixins import LoginRequiredMixin
from django.forms import model_to_dict
from .forms import PlayerForm
from .models import Player, Resource

# Create your views here.
class ListPlayersView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest):
        players = Player.objects.filter(owner=request.user)
        new_player_form = PlayerForm()
        return render(
            request,
            "resource_tracker/list_players.html",
            {"players": players, "form": new_player_form},
        )

    def post(self, request: HttpRequest):
        form = PlayerForm(request.POST)
        if form.is_valid():
            player = form.save(commit=False)
            player.owner = request.user
            player.save()
            return redirect(reverse_lazy("player_list"))
        else:
            player_characters = Player.objects.filter(owner=request.user)
            return render(
                request,
                "skyrim_helper/list_characters.html",
                {"players": player_characters, "form": form},
            )

class PlayerDeleteView(LoginRequiredMixin, DeleteView):
    model = Player
    success_url = reverse_lazy("player_list")
    template_name = "resource_tracker/player_confirm_delete.html"

    def get_queryset(self):
        return Player.objects.filter(owner=self.request.user)


class PlayerDetailView(LoginRequiredMixin, DetailView):
    model = Player
    template_name = "resource_tracker/player_detail.html"

    def get_queryset(self):
        return Player.objects.filter(owner=self.request.user)

    def get_context_data(self, object: Player):
        context = super().get_context_data()
        context["object_dict"] = model_to_dict(object)
        return context
