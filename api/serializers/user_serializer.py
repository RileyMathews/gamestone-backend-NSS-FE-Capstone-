from rest_framework import serializers
from api.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """ serializer for the user model """
    class Meta:
        fields = (
            'id',
            'url',
            'first_name',
            'last_name',
            'gamertag',
            'password',
            'platforms'
        )
        model = User
        depth = 1