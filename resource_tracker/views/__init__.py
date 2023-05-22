from django.http import HttpRequest
from django.template.response import TemplateResponse
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse
from django.forms import modelformset_factory
from django.contrib.auth.decorators import login_required

from typing import Any

from .. import models
from .. import forms


@login_required
def index(request: HttpRequest):
    game_templates = models.GameTemplate.objects.filter(owner=request.user)
    owned_game_instances = models.GameInstance.objects.filter(owner=request.user)
    playing_game_instances = models.GameInstance.objects.filter(
        gameplayer__player=request.user,
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
def game_template_create(request: HttpRequest):
    if request.method == "POST":
        form = forms.GameTemplateCreateForm(request.POST)
        if form.is_valid():
            form.instance.owner = request.user
            form.save()
            return redirect(form.instance.detail_url())

    else:
        form = forms.GameTemplateCreateForm()

    return TemplateResponse(
        request,
        "resource_tracker/form.html",
        {"form": form, "title": "Create a new game template"},
    )


@login_required
def game_template_detail(request: HttpRequest, id: str):
    game_template = get_object_or_404(models.GameTemplate, id=id, owner=request.user)
    game_instances = models.GameInstance.objects.filter(
        gameplayer__player=request.user, game_template=game_template
    )
    return TemplateResponse(
        request,
        "resource_tracker/game_template_detail.html",
        {
            "game_template": game_template,
            "game_instances": game_instances,
        },
    )


@login_required
def game_template_delete(request: HttpRequest, id: str):
    game_template = get_object_or_404(models.GameTemplate, id=id, owner=request.user)
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
def game_instance_create(request: HttpRequest, game_template_id: str):
    game_template = get_object_or_404(models.GameTemplate, id=game_template_id)
    if request.method == "POST":
        form = forms.GameInstanceForm(request.POST)
        if form.is_valid():
            game_instance = form.save(commit=False)
            game_instance.owner = request.user
            game_instance.game_template = game_template
            game_instance.save()
            game_instance.add_player(request.user)
            return redirect(game_instance.detail_url())

    else:
        form = forms.GameInstanceForm()

    return TemplateResponse(
        request,
        "resource_tracker/form.html",
        {"form": form, "title": f"Create game room for {game_template.name}"},
    )


@login_required
def game_instance_detail(request: HttpRequest, id: str):
    game_instance = get_object_or_404(
        models.GameInstance, id=id, gameplayer__player=request.user
    )
    join_url = request.build_absolute_uri(game_instance.join_url())

    return TemplateResponse(
        request,
        "resource_tracker/game_instance_detail.html",
        {
            "game_instance": game_instance,
            "join_url": join_url,
        },
    )


@login_required
def game_instance_play(request: HttpRequest, id: str):
    game_player = get_object_or_404(
        models.GamePlayer, game_instance=id, player=request.user
    )
    game_instance = game_player.game_instance
    resources = (
        models.PlayerResourceInstance.objects.prefetch_related(
            "resource_template__group"
        )
        .prefetch_related("resource_template")
        .filter(game_player=game_player, is_visible=True)
        .order_by("resource_template__name")
    )

    resources_by_group: dict[str, list[models.PlayerResourceInstance]] = {}

    for resource in resources:
        group_name = (
            resource.resource_template.group.name
            if resource.resource_template.group
            else "Other"
        )
        if group_name in resources_by_group.keys():
            resources_by_group[group_name].append(resource)
        else:
            resources_by_group[group_name] = [resource]

    dice = models.Die.objects.filter(game_template=game_instance.game_template)
    roll_log_data = models.generate_roll_log_template_data(game_player)
    roll_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return TemplateResponse(
        request,
        "resource_tracker/game_instance_play.html",
        {
            "game_instance": game_instance,
            "resources_by_group": resources_by_group,
            "roll_log_data": roll_log_data,
            "dice": dice,
            "roll_options": roll_options,
        },
    )


@login_required
def game_instance_delete(request: HttpRequest, id: str):
    game_instance = get_object_or_404(models.GameInstance, id=id, owner=request.user)
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
def join_game(request: HttpRequest, join_code: str):
    game = get_object_or_404(models.GameInstance, join_code=join_code)
    if request.method == "POST":
        game.add_player(request.user)
        return redirect(game.detail_url())

    else:
        return TemplateResponse(
            request,
            "resource_tracker/confirm_action.html",
            {"prompt": f"Do you want to join {game.name}"},
        )


@login_required
def game_instance_search(request: HttpRequest):
    context: dict[str, Any] = {"title": "Join a game room"}
    form = forms.GameInstanceSearchForm()
    context["form"] = form
    if code := request.GET.get("code"):
        game_instance = models.GameInstance.objects.filter(join_code=code)
        if game_instance.exists():
            return redirect(game_instance.get().detail_url())
        else:
            context["prompt"] = "Could not find a game with that code."
    return TemplateResponse(request, "resource_tracker/form.html", context)


@login_required
def special_die_create(request: HttpRequest, game_template_id: str):
    game_template = get_object_or_404(
        models.GameTemplate, owner=request.user, id=game_template_id
    )
    if request.method == "POST":
        form = forms.SpecialDieForm(request.POST)
        if form.is_valid():
            form.instance.game_template = game_template
            form.save()
            return redirect(form.instance.game_template.detail_url())

    else:
        form = forms.SpecialDieForm()

    return TemplateResponse(
        request,
        "resource_tracker/form.html",
        {"form": form, "title": f"adding die for {game_template.name}"},
    )


@login_required
def special_die_edit(request: HttpRequest, id: str):
    die = get_object_or_404(models.Die, id=id, game_template__owner=request.user)
    if request.method == "POST":
        form = forms.SpecialDieForm(request.POST, instance=die)
        if form.is_valid():
            form.save()
            return redirect(die.game_template.detail_url())
    else:
        form = forms.SpecialDieForm(instance=die)

    return TemplateResponse(request, "resource_tracker/form.html", {"form": form})


@login_required
def special_die_faces_edit(request: HttpRequest, id: str):
    die = get_object_or_404(models.Die, id=id, game_template__owner=request.user)
    current_faces = die.faces.all()
    SpecialDieFaceFormset = modelformset_factory(
        models.DieFace,
        fields=("name", "count"),
        can_delete=True,
    )
    if request.method == "POST":
        formset = SpecialDieFaceFormset(request.POST)
        if formset.is_valid():
            for form in formset:
                form.instance.die = die
            formset.save()
            return redirect(die.game_template.detail_url())
    else:
        formset = SpecialDieFaceFormset(queryset=current_faces)

    return TemplateResponse(
        request, "resource_tracker/formset.html", {"formset": formset, "can_add": True}
    )


@login_required
def special_die_faces_delete(request: HttpRequest, id: str):
    die_face = get_object_or_404(
        models.DieFace, id=id, die__game_template__owner=request.user
    )
    die = die_face.die
    die_face.delete()
    return redirect(die.edit_faces_url())


@login_required
def player_hidden_resources_edit(request: HttpRequest, game_instance_id: str):
    game_instance = get_object_or_404(
        models.GameInstance, id=game_instance_id, gameplayer__player=request.user
    )
    player_resources = models.PlayerResourceInstance.objects.filter(
        game_player__game_instance=game_instance, game_player__player=request.user
    )
    PlayerResourceInstanceFormset = modelformset_factory(
        models.PlayerResourceInstance, fields=("is_visible",), extra=0
    )
    if request.method == "POST":
        formset = PlayerResourceInstanceFormset(request.POST)
        if formset.is_valid():
            formset.save()
            return redirect(game_instance.play_url())
    else:
        formset = PlayerResourceInstanceFormset(queryset=player_resources)

    for form in formset:
        form.fields["is_visible"].label = form.instance.resource_template.name
        print(form)
    return TemplateResponse(
        request, "resource_tracker/formset.html", {"formset": formset, "can_add": False}
    )


@login_required
def game_template_player_resources_edit(request: HttpRequest, id: str):
    game_template = get_object_or_404(models.GameTemplate, id=id, owner=request.user)
    player_resources = models.PlayerResourceTemplate.objects.filter(
        game_template=game_template
    )
    PlayerResourceTemplateFormset = modelformset_factory(
        models.PlayerResourceTemplate,
        form=forms.ResourceForm,
        extra=1,
        can_delete=True,
    )
    if request.method == "POST":
        formset = PlayerResourceTemplateFormset(
            request.POST, form_kwargs={"game_template_id": id}
        )
        if formset.is_valid():
            for form in formset:
                form.instance.game_template = game_template
            formset.save()
            return redirect(game_template.detail_url())
    else:
        formset = PlayerResourceTemplateFormset(
            queryset=player_resources, form_kwargs={"game_template_id": id}
        )

    return TemplateResponse(
        request, "resource_tracker/formset.html", {"formset": formset, "can_add": True}
    )


@login_required
def die_delete(request: HttpRequest, id: str):
    die = get_object_or_404(models.Die, id=id, game_template__owner=request.user)
    prompt = f"Are you sure you want to delete {die.name}?"
    if request.method == "POST":
        game_template_id = die.game_template.id
        die.delete()
        return redirect(reverse("game-template-detail", args=[game_template_id]))

    return TemplateResponse(
        request,
        "resource_tracker/confirm_action.html",
        {"prompt": prompt},
    )
