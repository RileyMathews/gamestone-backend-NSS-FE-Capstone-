from rest_framework import serializers
from skyrim_helper.models import PlayerCharacter

class PlayerCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerCharacter
        fields = ['uuid', 'name', 'soul_gems', 'ore', 'experience', 'plants', 'septims']
