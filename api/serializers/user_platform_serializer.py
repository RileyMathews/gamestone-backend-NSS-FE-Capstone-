from rest_framework import serializers
from api.models import UserPlatform

class UserPlatformSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserPlatform
        fields = (
            'id',
            'url',
            'user',
            'platform'
        )