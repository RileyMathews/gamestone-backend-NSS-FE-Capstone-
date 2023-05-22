from rest_framework.viewsets import ModelViewSet
from skyrim_helper.api.serializers import PlayerCharacterSerializer
from skyrim_helper.models import PlayerCharacter


class PlayerCharacterViewset(ModelViewSet):
    serializer_class = PlayerCharacterSerializer
    queryset = PlayerCharacter.objects.all()
    lookup_field = "uuid"

    def get_queryset(self):
        return self.request.user.player_characters.all()

    def perform_create(self, serializer):
        serializer.save(player=self.request.user)
