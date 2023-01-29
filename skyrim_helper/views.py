from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest
from django.views import View
from django.views.generic import DeleteView, DetailView
from .models import PlayerCharacter
from .forms import PlayerCharactersCreateForm

@login_required
def app(request: HttpRequest):
    return render(
        request,
        "skyrim_helper/app.html"
    )

class ListCharactersView(LoginRequiredMixin, View):
    def get(self, request: HttpRequest):
        player_characters = PlayerCharacter.objects.filter(player=request.user)
        new_character_form = PlayerCharactersCreateForm()
        return render(
            request,
            "skyrim_helper/list_characters.html",
            {
                "player_characters": player_characters,
                "new_character_form": new_character_form
            }
        )

    def post(self, request: HttpRequest):
        form = PlayerCharactersCreateForm(request.POST)
        if form.is_valid():
            player_character = form.save(commit=False)
            player_character.player = request.user
            player_character.save()
            return redirect(reverse_lazy("player_characters_list"))
        else:
            player_characters = PlayerCharacter.objects.filter(player=request.user)
            return render(
                request,
                "skyrim_helper/list_characters.html",
                {
                    "player_characters": player_characters,
                    "new_character_form": form
                }
            )
    

class PlayerCharacterCreateView(LoginRequiredMixin, DeleteView):
    model = PlayerCharacter

class PlayerCharacterDeleteView(LoginRequiredMixin, DeleteView):
    model = PlayerCharacter
    success_url = reverse_lazy("player_characters_list")
    template_name = "skyrim_helper/player_character_confirm_delete.html"
    slug_field = 'uuid'
    slug_url_kwarg = 'uuid'

    def get_queryset(self):
        return PlayerCharacter.objects.filter(player=self.request.user)

class PlayerCharacterDetailView(LoginRequiredMixin, DetailView):
    model = PlayerCharacter
    template_name = "skyrim_helper/player_character_detail.html"
    slug_field = 'uuid'
    slug_url_kwarg = 'uuid'

    def get_queryset(self):
        return PlayerCharacter.objects.filter(player=self.request.user)

    def get_context_data(self, object: PlayerCharacter):
        context = super().get_context_data()
        context["object_dict"] = model_to_dict(object)
        return context
