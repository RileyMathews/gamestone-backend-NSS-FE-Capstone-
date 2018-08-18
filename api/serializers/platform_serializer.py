from rest_framework import serializers
from api.models import Platform

class PlatformSerializer(serializers.HyperlinkedModelSerializer):
    """ serializer for the Platform model """
    class Meta:
        fields = (
            'id',
            'url',
            'name',
            'company',
            'abreviation',
            'gbId'
        )
        model = Platform