from rest_framework import serializers
from identity.models import User
from .user_game_serializer import UserGameSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """serializer for the user model"""

    games = UserGameSerializer(many=True, read_only=True)

    class Meta:
        fields = ("id", "url", "username", "first_name", "last_name", "games")
        model = User
