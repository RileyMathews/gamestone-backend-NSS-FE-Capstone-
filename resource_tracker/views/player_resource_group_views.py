from django.http import HttpRequest
from django.template.response import TemplateResponse
from django.shortcuts import redirect, get_object_or_404
from django.forms import modelformset_factory
from django.contrib.auth.decorators import login_required

from .. import models


@login_required
def player_resource_group_edit(request: HttpRequest, game_template_id: str):
    game_template = get_object_or_404(
        models.GameTemplate, id=game_template_id, owner=request.user
    )
    resource_groups = models.PlayerResourceGroup.objects.filter(
        game_template=game_template
    )
    PlayerResourceGroupFormset = modelformset_factory(
        models.PlayerResourceGroup,
        fields=("name",),
        extra=1,
        can_delete=True,
    )
    if request.method == "POST":
        formset = PlayerResourceGroupFormset(request.POST)
        if formset.is_valid():
            for form in formset:
                form.instance.game_template = game_template
            formset.save()
            return redirect(game_template.detail_url())
    else:
        formset = PlayerResourceGroupFormset(queryset=resource_groups)

    return TemplateResponse(
        request, "resource_tracker/formset.html", {"formset": formset, "can_add": True}
    )
