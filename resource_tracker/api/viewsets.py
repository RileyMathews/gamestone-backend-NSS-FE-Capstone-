from rest_framework.viewsets import ModelViewSet
from . import serializers
from resource_tracker import models

class PlayerResourceInstanceViewset(ModelViewSet):
    serializer_class = serializers.PlayerResourceInstanceSerializer
    queryset = models.PlayerResourceInstance.objects.all()

    def get_queryset(self):
        return models.PlayerResourceInstance.objects.filter(game_player__player__user=self.request.user)
