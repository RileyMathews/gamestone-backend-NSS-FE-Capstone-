from identity.http import AuthenticatedHttpRequest
from django.template.response import TemplateResponse
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse
from django.forms import Form, model_to_dict, modelformset_factory
from django.contrib.auth.decorators import login_required

from typing import Any

from . import models
from . import forms
from .decorators import player_required
from .api import serializers


@login_required
def player_create(request: AuthenticatedHttpRequest):
    if request.method == "POST":
        form = forms.PlayerForm(request.POST)
        if form.is_valid():
            form.instance.user = request.user
            form.save()
            return redirect(request.GET.get("next"))

    else:
        form = forms.PlayerForm()

    return TemplateResponse(
        request,
        "resource_tracker/form.html",
        {
            "form": form,
            "title": "Create your player",
            "prompt": "You need to create a player name before continuing. This player name will be visible to others when you join games with them.",
        },
    )


@login_required
@player_required
def index(request: AuthenticatedHttpRequest):
    player = models.Player.objects.get(user=request.user)
    game_templates = models.GameTemplate.objects.filter(owner=player)
    owned_game_instances = models.GameInstance.objects.filter(owner=player)
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
            "game_instance_search_url": reverse("game-instance-search"),
            "game_template_create_url": reverse("game-template-create"),
        },
    )


@login_required
@player_required
def game_template_create(request: AuthenticatedHttpRequest):
    if request.method == "POST":
        form = forms.GameTemplateCreateForm(request.POST)
        if form.is_valid():
            form.instance.owner = request.user.player
            form.save()
            return redirect(reverse("game-template-detail", args=[form.instance.id]))

    else:
        form = forms.GameTemplateCreateForm()

    return TemplateResponse(
        request,
        "resource_tracker/form.html",
        {"form": form, "title": "Create a new game template"},
    )


@login_required
@player_required
def game_template_detail(request: AuthenticatedHttpRequest, id: str):
    player = models.Player.objects.get(user=request.user)
    game_template = get_object_or_404(models.GameTemplate, id=id, owner=player)
    game_instances = models.GameInstance.objects.filter(
        players=player, game_template=game_template
    )
    return TemplateResponse(
        request,
        "resource_tracker/game_template_detail.html",
        {
            "game_template": game_template,
            "game_instances": game_instances,
            "resources_edit_url": reverse(
                "game-template-player-resources-edit", args=[game_template.id]
            ),
            "special_die_create_url": reverse(
                "special-die-create", args=[game_template.id]
            ),
            "game_instance_create_url": reverse(
                "game-instance-create", args=[game_template.id]
            ),
            "game_template_delete_url": reverse(
                "game-template-delete", args=[game_template.id]
            ),
        },
    )


@login_required
@player_required
def game_template_delete(request: AuthenticatedHttpRequest, id: str):
    game_template = get_object_or_404(
        models.GameTemplate, id=id, owner=request.user.player
    )
    prompt = f"Are you sure you want to delete {game_template.name}?"
    if request.method == "POST":
        game_template.delete()
        return redirect(reverse("resource-tracker-index"))
    else:
        games = models.GameInstance.objects.filter(game_template=game_template)
        if games.count() > 0:
            prompt += f" Warning there are {games.count()} games with this template. Deleting this template will also delete those games!"

        return TemplateResponse(
            request,
            "resource_tracker/confirm_action.html",
            {"prompt": prompt},
        )


@login_required
@player_required
def game_instance_create(request: AuthenticatedHttpRequest, game_template_id: str):
    game_template = get_object_or_404(models.GameTemplate, id=game_template_id)
    if request.method == "POST":
        form = forms.GameInstanceForm(request.POST)
        if form.is_valid():
            game_instance = form.save(commit=False)
            game_instance.owner = request.user.player
            game_instance.game_template = game_template
            game_instance.save()
            game_instance.add_player(models.Player.objects.get(user=request.user))
            game_instance.populate_resources()
            return redirect(reverse("game-instance-detail", args=[game_instance.id]))

    else:
        form = forms.GameInstanceForm()

    return TemplateResponse(
        request,
        "resource_tracker/form.html",
        {"form": form, "title": f"Create game room for {game_template.name}"},
    )


@login_required
@player_required
def game_instance_detail(request: AuthenticatedHttpRequest, id: str):
    game_instance = get_object_or_404(
        models.GameInstance, id=id, players=request.user.player
    )
    join_url = request.build_absolute_uri(game_instance.join_url())
    play_url = reverse("game-instance-play", args=[game_instance.id])
    delete_url = reverse("game-instance-delete", args=[game_instance.id])
    template_url = reverse(
        "game-template-detail", args=[game_instance.game_template.id]
    )
    return TemplateResponse(
        request,
        "resource_tracker/game_instance_detail.html",
        {
            "game_instance": game_instance,
            "join_url": join_url,
            "play_url": play_url,
            "delete_url": delete_url,
            "template_url": template_url,
        },
    )


@login_required
@player_required
def game_instance_play(request: AuthenticatedHttpRequest, id: str):
    game_instance = get_object_or_404(
        models.GameInstance, id=id, players=request.user.player
    )
    resources = models.PlayerResourceInstance.objects.filter(
        game_instance=game_instance, owner=request.user.player, is_visible=True
    )
    resources_list = serializers.PlayerResourceInstanceSerializer(
        resources, many=True
    ).data
    dice = models.SpecialDie.objects.filter(game_template=game_instance.game_template)
    serialized_dice = serializers.SpecialDieSerializer(dice, many=True).data
    return TemplateResponse(
        request,
        "resource_tracker/game_instance_play.html",
        {
            "game_instance": game_instance,
            "resources": resources,
            "resources_list": resources_list,
            "serialized_dice": serialized_dice,
        },
    )


@login_required
@player_required
def game_instance_delete(request: AuthenticatedHttpRequest, id: str):
    game_instance = get_object_or_404(
        models.GameInstance, id=id, owner=request.user.player
    )
    if request.method == "POST":
        game_instance.delete()
        return redirect(reverse("resource-tracker-index"))

    return TemplateResponse(
        request,
        "resource_tracker/confirm_action.html",
        {
            "game_instance": game_instance,
            "prompt": f"Are you sure you want to delete game {game_instance.name}",
        },
    )


@login_required
@player_required
def join_game(request: AuthenticatedHttpRequest, join_code: str):
    game = get_object_or_404(models.GameInstance, join_code=join_code)
    if request.method == "POST":
        player = get_object_or_404(models.Player, user=request.user)
        game.add_player(player)
        return redirect(reverse("game-instance-detail", args=[game.id]))

    else:
        return TemplateResponse(
            request,
            "resource_tracker/confirm_action.html",
            {"prompt": f"Do you want to join {game.name}"},
        )


@login_required
@player_required
def game_instance_search(request: AuthenticatedHttpRequest):
    context: dict[str, Any] = {"title": "Join a game room"}
    form = forms.GameInstanceSearchForm()
    context["form"] = form
    if code := request.GET.get("code"):
        if models.GameInstance.objects.filter(join_code=code).exists():
            return redirect(reverse("game-instance-join", args=[code]))
        else:
            context["prompt"] = "Could not find a game with that code."
    return TemplateResponse(request, "resource_tracker/form.html", context)


@login_required
@player_required
def special_die_create(request: AuthenticatedHttpRequest, game_template_id: str):
    game_template = get_object_or_404(models.GameTemplate, owner=request.user.player)
    if request.method == "POST":
        form = forms.SpecialDieForm(request.POST)
        if form.is_valid():
            form.instance.game_template = game_template
            form.save()
            return redirect(
                reverse("game-template-detail", args=[form.instance.game_template.id])
            )

    else:
        form = forms.SpecialDieForm()

    return TemplateResponse(
        request,
        "resource_tracker/form.html",
        {"form": form, "title": f"adding die for {game_template.name}"},
    )


@login_required
@player_required
def special_die_edit(request: AuthenticatedHttpRequest, id: str):
    die = get_object_or_404(
        models.SpecialDie, id=id, game_template__owner=request.user.player
    )
    if request.method == "POST":
        form = forms.SpecialDieForm(request.POST, instance=die)
        if form.is_valid():
            form.save()
            return redirect(
                reverse("game-template-detail", args=[die.game_template.id])
            )
    else:
        form = forms.SpecialDieForm(instance=die)

    return TemplateResponse(request, "resource_tracker/form.html", {"form": form})


@login_required
@player_required
def special_die_faces_edit(request: AuthenticatedHttpRequest, id: str):
    die = get_object_or_404(
        models.SpecialDie, id=id, game_template__owner=request.user.player
    )
    current_faces = die.faces.all()
    SpecialDieFaceFormset = modelformset_factory(
        models.SpecialDieFace,
        fields=("name", "count"),
        can_delete=True,
    )
    if request.method == "POST":
        formset = SpecialDieFaceFormset(request.POST)
        if formset.is_valid():
            for form in formset:
                form.instance.die = die
            formset.save()
            return redirect(
                reverse("game-template-detail", args=[die.game_template.id])
            )
    else:
        formset = SpecialDieFaceFormset(queryset=current_faces)

    return TemplateResponse(
        request, "resource_tracker/formset.html", {"formset": formset, "can_add": True}
    )


@login_required
@player_required
def special_die_faces_delete(request: AuthenticatedHttpRequest, id: str):
    die_face = get_object_or_404(
        models.SpecialDieFace, id=id, die__game_template__owner=request.user.player
    )
    die = die_face.die
    die_face.delete()
    return redirect(reverse("special-die-faces-edit", args=[die.id]))


@login_required
@player_required
def player_hidden_resources_edit(
    request: AuthenticatedHttpRequest, game_instance_id: str
):
    game_instance = get_object_or_404(
        models.GameInstance, id=game_instance_id, players=request.user.player
    )
    player_resources = models.PlayerResourceInstance.objects.filter(
        owner=request.user.player, game_instance=game_instance
    )
    PlayerResourceInstanceFormset = modelformset_factory(
        models.PlayerResourceInstance, fields=("is_visible",), extra=0
    )
    if request.method == "POST":
        formset = PlayerResourceInstanceFormset(request.POST)
        if formset.is_valid():
            formset.save()
            return redirect(reverse("game-instance-play", args=[game_instance.id]))
    else:
        formset = PlayerResourceInstanceFormset(queryset=player_resources)

    for form in formset:
        form.fields["is_visible"].label = form.instance.resource_template.name
        print(form)
    return TemplateResponse(
        request, "resource_tracker/formset.html", {"formset": formset, "can_add": False}
    )


@login_required
@player_required
def game_template_player_resources_edit(request: AuthenticatedHttpRequest, id: str):
    game_template = get_object_or_404(
        models.GameTemplate, id=id, owner=request.user.player
    )
    player_resources = models.PlayerResourceTemplate.objects.filter(
        game_template=game_template
    )
    PlayerResourceTemplateFormset = modelformset_factory(
        models.PlayerResourceTemplate,
        fields=("name", "min_ammount", "max_ammount"),
        extra=1,
        can_delete=True,
    )
    if request.method == "POST":
        formset = PlayerResourceTemplateFormset(request.POST)
        if formset.is_valid():
            for form in formset:
                form.instance.game_template = game_template
            formset.save()
            return redirect(reverse("game-template-detail", args=[game_template.id]))
    else:
        formset = PlayerResourceTemplateFormset(queryset=player_resources)

    return TemplateResponse(
        request, "resource_tracker/formset.html", {"formset": formset, "can_add": True}
    )
