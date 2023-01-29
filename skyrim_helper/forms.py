from django.forms import ModelForm
from .models import PlayerCharacter


class PlayerCharactersCreateForm(ModelForm):
    class Meta:
        model = PlayerCharacter
        fields = ["name"]
