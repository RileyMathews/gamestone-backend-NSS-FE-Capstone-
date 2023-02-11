from django.conf import settings
from django.db import models
from model_utils.models import UUIDModel
from django.utils.crypto import get_random_string
from django.urls import reverse

# Create your models here.


def create_random_join_code():
    return get_random_string(4).upper()


class Player(UUIDModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="player"
    )
    name = models.CharField(max_length=255)


class GameTemplate(UUIDModel):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)


class PlayerResourceTemplate(UUIDModel):
    name = models.CharField(max_length=255)
    game_template = models.ForeignKey(
        GameTemplate, on_delete=models.CASCADE, related_name="player_resource_templates"
    )

    overridable_ranges = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    min_ammount = models.IntegerField(default=-2147483647)
    max_ammount = models.IntegerField(default=2147483647)

    def save(self, *args, **kwargs):
        super(PlayerResourceTemplate, self).save(*args, **kwargs)
        live_games = GameInstance.objects.filter(game_template=self.game_template)
        for game in live_games:
            for player in game.players.all():
                PlayerResourceInstance.objects.create(
                    owner=player, resource_template=self, game_instance=game
                )


class GameResourceTemplate(UUIDModel):
    name = models.CharField(max_length=255)
    game_template = models.ForeignKey(
        GameTemplate, on_delete=models.CASCADE, related_name="game_resource_templates"
    )

    overridable_ranges = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    min_ammount = models.IntegerField(default=-2147483647)
    max_ammount = models.IntegerField(default=2147483647)


class GameInstance(UUIDModel):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game_template = models.ForeignKey(GameTemplate, on_delete=models.CASCADE)
    join_code = models.CharField(
        default=create_random_join_code, max_length=4, unique=True
    )
    players = models.ManyToManyField(Player)

    def add_player(self, player_object: Player):
        self.players.add(player_object)
        resources = PlayerResourceTemplate.objects.filter(
            game_template=self.game_template
        )
        for resource in resources:
            PlayerResourceInstance.objects.create(
                owner=player_object, game_instance=self, resource_template=resource
            )

    def populate_resources(self):
        resource_templates = GameResourceTemplate.objects.filter(
            game_template=self.game_template
        )
        for resource in resource_templates:
            GameResourceInstance.objects.create(
                game_instance=self,
                resource_template=resource,
            )
        
    def join_url(self):
        return reverse("game-instance-join", args=[self.join_code])


class GameResourceInstance(UUIDModel):
    game_instance = models.ForeignKey(GameInstance, on_delete=models.CASCADE)
    resource_template = models.ForeignKey(
        GameResourceTemplate, on_delete=models.CASCADE
    )
    current_ammount = models.IntegerField(default=0)


class PlayerResourceInstance(UUIDModel):
    owner = models.ForeignKey(Player, on_delete=models.CASCADE)
    game_instance = models.ForeignKey(GameInstance, on_delete=models.CASCADE)
    resource_template = models.ForeignKey(
        PlayerResourceTemplate, on_delete=models.CASCADE
    )

    current_ammount = models.IntegerField(default=0)
    min_ammount_override = models.IntegerField(blank=True, null=True)
    max_ammount_override = models.IntegerField(blank=True, null=True)
