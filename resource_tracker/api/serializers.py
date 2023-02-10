from resource_tracker import models
from rest_framework.serializers import ModelSerializer

class PlayerResourceTemplateSerializer(ModelSerializer):
    class Meta:
        model = models.PlayerResourceTemplate
        fields = ("id", "name", "game_template", "overridable_ranges", "is_public", "min_ammount", "max_ammount",)


class PlayerResourceInstanceSerializer(ModelSerializer):
    resource_template = PlayerResourceTemplateSerializer(read_only=True)

    class Meta:
        model = models.PlayerResourceInstance
        fields = ("id", "owner", "game_instance", "resource_template", "current_ammount", "min_ammount_override", "max_ammount_override",)
