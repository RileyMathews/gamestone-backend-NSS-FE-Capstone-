from rest_framework import serializers
from api.models import UserGame

class UserGameSerializer(serializers.ModelSerializer):
    """ serializer for user game """
    class Meta:
        model = UserGame
        fields = (
            'id',
            'is_favorite',
            'giant_bomb_id',
            'progress'
        )