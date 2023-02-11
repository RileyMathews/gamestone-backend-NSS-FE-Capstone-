from django.http import HttpRequest
from django.template.response import TemplateResponse
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse
from django.forms import Form, model_to_dict
from django.contrib.auth.decorators import login_required

from . import models
from . import forms
from .decorators import player_required
from .api import serializers


@login_required
def player_create(request: HttpRequest):
    if request.method == "POST":
        form = forms.PlayerForm(request.POST)
        if form.is_valid():
            form.instance.user = request.user
            form.save()
            return redirect(reverse("resource-tracker-index"))

    else:
        form = forms.PlayerForm()

    return TemplateResponse(
        request, "resource_tracker/player_create.html", {"form": form}
    )


@login_required
@player_required
def index(request: HttpRequest):
    game_templates = models.GameTemplate.objects.filter(owner=request.user)
    owned_game_instances = models.GameInstance.objects.filter(owner=request.user)
    player = models.Player.objects.get(user=request.user)
    playing_game_instances = models.GameInstance.objects.filter(
        players=player,
    )
    return TemplateResponse(
        request,
        "resource_tracker/index.html",
        {
            "game_templates": game_templates,
            "owned_game_instances": owned_game_instances,
            "playing_game_instances": playing_game_instances,
        },
    )


@login_required
def game_template_create(request: HttpRequest):
    if request.method == "POST":
        form = forms.GameTemplateCreateForm(request.POST)
        if form.is_valid():
            form.instance.owner = request.user
            form.save()
            return redirect(reverse("game-template-detail", args=[form.instance.id]))

    else:
        form = forms.GameTemplateCreateForm()

    return TemplateResponse(
        request, "resource_tracker/game_template_create.html", {"form": form}
    )


@login_required
@player_required
def game_template_detail(request: HttpRequest, id: str):
    game_template = get_object_or_404(models.GameTemplate, id=id, owner=request.user)
    player = models.Player.objects.get(user=request.user)
    game_instances = models.GameInstance.objects.filter(players=player, game_template=game_template)
    return TemplateResponse(
        request,
        "resource_tracker/game_template_detail.html",
        {"game_template": game_template, "game_instances": game_instances},
    )


@login_required
def game_template_delete(request: HttpRequest, id: str):
    game_template = get_object_or_404(models.GameTemplate, id=id, owner=request.user)
    if request.method == "POST":
        game_template.delete()
        return redirect(reverse("resource-tracker-index"))
    else:
        games = models.GameInstance.objects.filter(game_template=game_template)
        if games.count() > 0:
            warning_message = f"Warning there are {games.count()} games with this template. Deleting this template will also delete those games!"
        else:
            warning_message = ""

        return TemplateResponse(
            request,
            "resource_tracker/game_template_delete.html",
            {"warning_message": warning_message, "game_template": game_template},
        )


@login_required
def player_resource_template_create(request: HttpRequest, game_template_id: str):
    game_template = get_object_or_404(
        models.GameTemplate, id=game_template_id, owner=request.user
    )

    if request.method == "POST":
        form = forms.ResourceCreateForm(request.POST)
        form.instance.game_template = game_template
        if form.is_valid():
            form.save()
            return redirect(reverse("game-template-detail", args=[game_template.id]))

    else:
        form = forms.ResourceCreateForm()

    return TemplateResponse(
        request,
        "resource_tracker/player_resource_template_create.html",
        {"game_template": game_template, "form": form},
    )


@login_required
def player_resource_template_edit(request: HttpRequest, game_template_id: str, id: str):
    game_template = get_object_or_404(
        models.GameTemplate, id=game_template_id, owner=request.user
    )
    resource = get_object_or_404(
        models.PlayerResourceTemplate, id=id, game_template=game_template
    )

    if request.method == "POST":
        form = forms.ResourceCreateForm(request.POST, instance=resource)
        if form.is_valid():
            form.save()
            return redirect(reverse("game-template-detail", args=[game_template.id]))
    else:
        form = forms.ResourceCreateForm(instance=resource)

    return TemplateResponse(
        request,
        "resource_tracker/player_resource_template_edit.html",
        {"game_template": game_template, "form": form},
    )


@login_required
def player_resource_template_delete(
    request: HttpRequest, game_template_id: str, id: str
):
    game_template = get_object_or_404(
        models.GameTemplate, id=game_template_id, owner=request.user
    )
    resource = get_object_or_404(
        models.PlayerResourceTemplate, id=id, game_template=game_template
    )
    if request.method == "POST":
        resource.delete()
        return redirect(reverse("game-template-detail", args=[game_template.id]))
    else:
        return TemplateResponse(
            request,
            "resource_tracker/player_resource_template_delete.html",
            {"resource": resource},
        )


@login_required
@player_required
def game_instance_create(request: HttpRequest, game_template_id: str):
    game_template = get_object_or_404(models.GameTemplate, id=game_template_id)
    if request.method == "POST":
        form = forms.GameInstanceForm(request.POST)
        if form.is_valid():
            game_instance = form.save(commit=False)
            game_instance.owner = request.user
            game_instance.game_template = game_template
            game_instance.save()
            game_instance.add_player(models.Player.objects.get(user=request.user))
            game_instance.populate_resources()
            return redirect(reverse("game-instance-detail", args=[game_instance.id]))

    else:
        form = forms.GameInstanceForm()

    return TemplateResponse(
        request,
        "resource_tracker/game_instance_create.html",
        {"form": form, "game_template": game_template},
    )


@login_required
@player_required
def game_instance_detail(request: HttpRequest, id: str):
    game_instance = get_object_or_404(
        models.GameInstance, id=id, players=request.user.player
    )
    join_url = request.build_absolute_uri(game_instance.join_url())
    return TemplateResponse(
        request,
        "resource_tracker/game_instance_detail.html",
        {"game_instance": game_instance, "join_url": join_url},
    )


@login_required
@player_required
def game_instance_play(request: HttpRequest, id: str):
    game_instance = get_object_or_404(
        models.GameInstance, id=id, players=request.user.player
    )
    resources = models.PlayerResourceInstance.objects.filter(
        game_instance=game_instance, owner=request.user.player
    )
    resources_list = serializers.PlayerResourceInstanceSerializer(resources, many=True).data
    return TemplateResponse(
        request,
        "resource_tracker/game_instance_play.html",
        {"game_instance": game_instance, "resources": resources, 'resources_list': resources_list},
    )


@login_required
@player_required
def game_instance_delete(request: HttpRequest, id: str):
    game_instance = get_object_or_404(models.GameInstance, id=id, owner=request.user)
    if request.method == "POST":
        game_instance.delete()
        return redirect(reverse("resource-tracker-index"))

    return TemplateResponse(
        request,
        "resource_tracker/game_instance_delete.html",
        {"game_instance": game_instance},
    )


@login_required
@player_required
def join_game(request: HttpRequest, join_code: str):
    game = get_object_or_404(models.GameInstance, join_code=join_code)
    if request.method == "POST":
        player = get_object_or_404(models.Player, user=request.user)
        game.add_player(player)
        return redirect(reverse("game-instance-detail", args=[game.id]))

    else:
        return TemplateResponse(
            request, "resource_tracker/join_game.html", {"game": game}
        )


@login_required
@player_required
def game_instance_search(request: HttpRequest):
    context = {}
    if code := request.GET.get("code"):
        if models.GameInstance.objects.filter(join_code=code).exists():
            return redirect(reverse("game-instance-join", args=[code]))
        else:
            context["error"] = "Could not find a game with that code."
    return TemplateResponse(
        request, "resource_tracker/game_instance_search.html", context
    )
