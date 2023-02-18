from django.template.response import TemplateResponse
from identity.http import AuthenticatedHttpRequest
from .decorators import player_required
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from . import models


@login_required
@player_required
def roll_dice(
    request: AuthenticatedHttpRequest,
    game_instance_id: str,
    die_id: str,
    number_to_roll: str,
):
    player = request.user.player
    die = get_object_or_404(models.SpecialDie, id=die_id)
    game_instance = get_object_or_404(models.GameInstance, id=game_instance_id, players=player)
    roll_log = models.RollLog.objects.get_or_create(
        player=player, game_instance=game_instance
    )[0]
    to_roll = int(number_to_roll)
    for i in range(0, to_roll):
        models.RollLogEntry.objects.create(die=die, log=roll_log, face=die.roll())

    return TemplateResponse(
        request, "resource_tracker/roll_log.html", {"roll_log_data": roll_log.generate_template_data()}
    )

@login_required
@player_required
def archive_rolls(request: AuthenticatedHttpRequest, game_instance_id: str):
    roll_log = get_object_or_404(
        models.RollLog, player=request.user.player, game_instance=game_instance_id
    )
    models.RollLogEntry.objects.filter(log=roll_log, is_archived=False).update(is_archived=True)

    return TemplateResponse(
        request, "resource_tracker/roll_log.html", {"roll_log_data": roll_log.generate_template_data()}
    )
