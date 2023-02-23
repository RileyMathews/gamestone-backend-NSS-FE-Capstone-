from django.template.response import TemplateResponse
from identity.http import AuthenticatedHttpRequest
from django.http import HttpResponse
from .decorators import player_required
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from . import models, forms


@login_required
@player_required
def roll_dice_hx(
    request: AuthenticatedHttpRequest,
    game_instance_id: str,
    die_id: str,
    number_to_roll: str,
):
    player = request.user.player
    die = get_object_or_404(models.Die, id=die_id)
    game_instance = get_object_or_404(
        models.GameInstance, id=game_instance_id, game_players=player
    )
    roll_log = models.RollLog.objects.get_or_create(
        game_player__player=player, game_player__game_instance=game_instance
    )[0]
    to_roll = int(number_to_roll)
    die.roll(to_roll, roll_log)

    return TemplateResponse(
        request,
        "resource_tracker/hx/roll_log.html",
        {
            "roll_log_data": models.generate_roll_log_template_data(
                request.user.player, game_instance
            )
        },
    )


@login_required
@player_required
def archive_rolls_hx(request: AuthenticatedHttpRequest, game_instance_id: str):
    roll_log = get_object_or_404(
        models.RollLog, game_player__player=request.user.player, game_player__game_instance=game_instance_id
    )
    models.RollLogEntry.objects.filter(log=roll_log, is_archived=False).update(
        is_archived=True
    )

    return TemplateResponse(
        request,
        "resource_tracker/hx/roll_log.html",
        {
            "roll_log_data": models.generate_roll_log_template_data(
                request.user.player, game_instance_id
            )
        },
    )


@login_required
@player_required
def player_resource_incriment_hx(request: AuthenticatedHttpRequest, id: str):
    resource = models.PlayerResourceInstance.objects.get(
        id=id, game_player__player=request.user.player
    )
    change_by = int(request.POST.get("change_by", 0))
    resource.current_ammount += change_by
    resource.save()
    return HttpResponse(resource.current_ammount)


@login_required
@player_required
def resource_instance_edit_hx(request: AuthenticatedHttpRequest, id: str):
    resource = get_object_or_404(
        models.PlayerResourceInstance, id=id, game_player__player=request.user.player
    )
    if request.method == "POST":
        form = forms.ResourceInstanceAmmountForm(request.POST, instance=resource)
        if form.is_valid():
            form.save()
            return TemplateResponse(
                request,
                "resource_tracker/hx/resource_instance.html",
                {"resource": resource},
            )
    else:
        form = forms.ResourceInstanceAmmountForm(instance=resource)

    return TemplateResponse(
        request,
        "resource_tracker/hx/resource_instance_edit.html",
        {"form": form, "resource": resource},
    )


@login_required
@player_required
def resource_instance_hx(request: AuthenticatedHttpRequest, id: str):
    resource = get_object_or_404(
        models.PlayerResourceInstance, id=id, game_player__player=request.user.player
    )
    return TemplateResponse(
        request, "resource_tracker/hx/resource_instance.html", {"resource": resource}
    )
