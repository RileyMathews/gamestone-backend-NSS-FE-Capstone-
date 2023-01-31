from resource_tracker import models
from resource_tracker.api import serializers
from rest_framework.viewsets import ModelViewSet

class PlayerViewSet(ModelViewSet):
    serializer_class = serializers.PlayerSerializer
    queryset = models.Player.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ResourceViewSet(ModelViewSet):
    serializer_class = serializers.ResourceSerializer
    queryset = models.Resource.objects.all()
