from django.forms import ModelForm, Form
from django import forms
from . import models


class GameTemplateCreateForm(ModelForm):
    class Meta:
        model = models.GameTemplate
        fields = ("name",)

class ResourceForm(ModelForm):
    class Meta:
        model = models.PlayerResourceTemplate
        fields = ("name", "min_ammount", "max_ammount", "group")

    def __init__(self, *args, **kwargs):
        game_template_id = kwargs.pop("game_template_id")
        super().__init__(*args, **kwargs)
        self.fields["group"].queryset = models.PlayerResourceGroup.objects.filter(game_template_id=game_template_id)

class GameInstanceForm(ModelForm):
    class Meta:
        model = models.GameInstance
        fields = ("name",)

class PlayerForm(ModelForm):
    class Meta:
        model = models.Player
        fields = ("name",)

class GameInstanceSearchForm(Form):
    code = forms.CharField()

class SpecialDieForm(ModelForm):
    class Meta:
        model = models.Die
        fields = ("name",)

class SpecialDieFaceForm(ModelForm):
    class Meta:
        model = models.DieFace
        fields = ("name", "count",)

class ResourceInstanceAmmountForm(ModelForm):
    current_ammount = forms.CharField()
    class Meta:
        model = models.PlayerResourceInstance
        fields = ("current_ammount",)
