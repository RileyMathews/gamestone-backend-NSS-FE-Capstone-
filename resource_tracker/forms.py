from django.forms import ModelForm
from .models import Player, Resource

class PlayerForm(ModelForm):
    class Meta:
        model = Player
        fields = ("name",)

class ResourceForm(ModelForm):
    class Meta:
        model = Resource
        fields = ("name", "max_ammount", "min_ammount")
