from django.template.response import TemplateResponse
from identity.http import AuthenticatedHttpRequest
from .decorators import player_required
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from . import models

@login_required
@player_required
def roll_dice(request: AuthenticatedHttpRequest, game_instance_id: str, die_id: str, number_to_roll: str):
    player = request.user.player
    die = get_object_or_404(models.SpecialDie, id=die_id)
    game_instance = get_object_or_404(models.GameInstance, players=player)
    roll_log = models.RollLog.objects.get_or_create(player=player, game_instance=game_instance)
    to_roll = int(number_to_roll)
    for i in range(1, to_roll):
        