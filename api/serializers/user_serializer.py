from rest_framework import serializers
from django.conf import settings
from .platform_serializer import PlatformSerializer
from .user_game_serializer import UserGameSerializer

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """ serializer for the user model """
    platforms = PlatformSerializer(many=True, read_only=True)
    games = UserGameSerializer(many=True, read_only=True)
    class Meta:
        fields = (
            'id',
            'url',
            'username',
            'first_name',
            'last_name',
            'platforms',
            'games'
        )
        model = settings.AUTH_USER_MODEL
