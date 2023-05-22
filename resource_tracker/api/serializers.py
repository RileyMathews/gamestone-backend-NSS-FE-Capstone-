from resource_tracker import models
from rest_framework.serializers import ModelSerializer


class PlayerResourceTemplateSerializer(ModelSerializer):
    class Meta:
        model = models.PlayerResourceTemplate
        fields = (
            "id",
            "name",
            "game_template",
            "overridable_ranges",
            "is_public",
            "min_ammount",
            "max_ammount",
        )


class PlayerResourceInstanceSerializer(ModelSerializer):
    resource_template = PlayerResourceTemplateSerializer(read_only=True)

    class Meta:
        model = models.PlayerResourceInstance
        fields = (
            "id",
            "resource_template",
            "current_ammount",
            "is_visible",
        )


class SpecialDieFaceSerializer(ModelSerializer):
    class Meta:
        model = models.DieFace
        fields = (
            "id",
            "name",
            "count",
        )


class SpecialDieSerializer(ModelSerializer):
    faces = SpecialDieFaceSerializer(many=True)

    class Meta:
        model = models.Die
        fields = (
            "id",
            "name",
            "faces",
        )
