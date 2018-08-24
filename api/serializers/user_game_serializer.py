from rest_framework import serializers
from api.models import UserGame

class UserGameSerializer(serializers.HyperlinkedModelSerializer):
    """ serializer for user game """
    class Meta:
        model = UserGame
        fields = (
            'id',
            'url',
            'user',
            'isFavorited',
            'gbId',
            'progress'
        )