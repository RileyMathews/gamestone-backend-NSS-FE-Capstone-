from django.forms import ModelForm, Form
from django import forms
from . import models


class GameTemplateCreateForm(ModelForm):
    class Meta:
        model = models.GameTemplate
        fields = ("name",)

class ResourceCreateForm(ModelForm):
    class Meta:
        model = models.PlayerResourceTemplate
        fields = ("name", "min_ammount", "max_ammount")

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
