from resource_tracker.models import Player, Resource
from rest_framework.serializers import HyperlinkedModelSerializer

class PlayerSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Player
        fields = ["id", "url", "name"]

class ResourceSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Resource
        fields = ("id", "url", "name", "current_ammount", "max_ammount", "min_ammount")
