from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from . import forms
from .models import Player, Resource

# Create your views here.
@login_required
def player_list(request: HttpRequest):
    players = Player.objects.filter(owner=request.user)
    initial_data = request.POST if request.method == 'POST' else None
    form = forms.PlayerForm(initial_data)
    form.instance.owner = request.user
    if request.method == "POST":
        form.add_error("name", "this is a test error")
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy("player_list"))

    return TemplateResponse(
        request,
        "resource_tracker/list_players.html",
        {"players": players, "form": form},
    )


@login_required
def player_delete(request: HttpRequest, pk: str):
    player = get_object_or_404(Player, id=pk, owner=request.user)
    if request.method == "POST":
        player.delete()
        return redirect(reverse("player_list"))

    return render(
        request,
        "resource_tracker/confirm_delete.html",
        {"object": player},
    )


@login_required
def player_detail(request: HttpRequest, pk: str):
    player = get_object_or_404(Player, pk=pk, owner=request.user)
    return TemplateResponse(
        request, "resource_tracker/player_detail.html", {"player": player}
    )


@login_required
def resource_create(request: HttpRequest, player_id: str):
    player = get_object_or_404(Player, id=player_id, owner=request.user)
    form = forms.ResourceForm(request.POST)
    if request.method == "POST":
        if form.is_valid():
            resource = form.save(commit=False)
            resource.player = player
            resource.save()
            if "add_another" in request.POST:
                return redirect("resource_create", player_id)
            else:
                return redirect("player_detail", player_id)

    context = {"form": form}
    return TemplateResponse(request, "resource_tracker/resource_form.html", context)


@login_required
def resource_delete(request: HttpRequest, pk: str):
    resource = get_object_or_404(Resource, player__owner=request.user)
    player_id = resource.player.id
    if request.method == "POST":
        resource.delete()
        return redirect(reverse("player_detail", args=[player_id]))

    return render(
        request,
        "resource_tracker/confirm_delete.html",
        {"object": resource},
    )
