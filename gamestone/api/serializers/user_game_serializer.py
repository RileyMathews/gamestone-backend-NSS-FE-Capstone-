from rest_framework import serializers
from gamestone.models import UserGame


class UserGameSerializer(serializers.ModelSerializer):
    """serializer for user game"""

    class Meta:
        model = UserGame
        fields = (
            "id",
            "isFavorited",
            "giantbomb_game",
        )
