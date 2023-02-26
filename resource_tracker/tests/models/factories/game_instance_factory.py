from .game_template_factory import game_template_factory
from resource_tracker.models import GameInstance

def game_instance_factory():
    template = game_template_factory()
    return GameInstance.objects.create(
        name="test", owner=template.owner, game_template=template
    )
