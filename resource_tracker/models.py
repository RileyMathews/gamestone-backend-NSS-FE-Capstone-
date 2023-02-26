from django.conf import settings
from django.db import models
from model_utils.models import UUIDModel, TimeStampedModel
from django.utils.crypto import get_random_string
from django.urls import reverse
import random

# Create your models here.


def create_random_join_code():
    return get_random_string(4).upper()


class Player(UUIDModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="player"
    )
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class GameTemplate(UUIDModel):
    owner = models.ForeignKey(Player, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def detail_url(self):
        return reverse("game-template-detail", args=[self.id])

    def player_resources_edit_url(self):
        return reverse("game-template-player-resources-edit", args=[self.id])

    def special_die_create_url(self):
        return reverse("special-die-create", args=[self.id])

    def game_instance_create_url(self):
        return reverse("game-instance-create", args=[self.id])

    def delete_url(self):
        return reverse("game-template-delete", args=[self.id])


class PlayerResourceTemplate(UUIDModel):
    name = models.CharField(max_length=255)
    game_template = models.ForeignKey(
        GameTemplate, on_delete=models.CASCADE, related_name="player_resource_templates"
    )

    overridable_ranges = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    min_ammount = models.IntegerField(default=0)
    max_ammount = models.IntegerField(default=10000)

    def __str__(self):
        return f"{self.name} from {self.game_template.name}"

    def save(self, *args, **kwargs):
        super(PlayerResourceTemplate, self).save(*args, **kwargs)
        live_games = GameInstance.objects.filter(game_template=self.game_template)
        for game in live_games:
            for game_player in GamePlayer.objects.filter(game_instance=game):
                PlayerResourceInstance.objects.create(
                    game_player=game_player, resource_template=self,
                )


class GameInstance(UUIDModel):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="owned_game_instances"
    )
    game_template = models.ForeignKey(GameTemplate, on_delete=models.CASCADE)
    join_code = models.CharField(
        default=create_random_join_code, max_length=4, unique=True
    )
    # game_players = models.ManyToManyField(Player, through="GamePlayer")

    def __str__(self):
        return self.name

    def detail_url(self):
        return reverse("game-instance-detail", args=[self.id])

    def visible_resources_edit_url(self):
        return reverse("player-hidden-resources-edit", args=[self.id])

    def play_url(self):
        return reverse("game-instance-play", args=[self.id])
    
    def play_htmx_url(self):
        return reverse("game-instance-play-htmx", args=[self.id])

    def delete_url(self):
        return reverse("game-instance-delete", args=[self.id])

    def add_player(self, player_object: Player):
        game_player = GamePlayer.objects.create(
            player=player_object, game_instance=self
        )
        resources = PlayerResourceTemplate.objects.filter(
            game_template=self.game_template
        )
        for resource in resources:
            PlayerResourceInstance.objects.create(
                game_player=game_player, resource_template=resource
            )

    def join_url(self):
        return reverse("game-instance-join", args=[self.join_code])


class GamePlayer(UUIDModel):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    game_instance = models.ForeignKey(GameInstance, on_delete=models.CASCADE)
    player_resource_instances: models.Manager["PlayerResourceInstance"]

    class Meta:
        unique_together = ["player", "game_instance"]


class PlayerResourceInstance(UUIDModel):
    game_player = models.ForeignKey(GamePlayer, on_delete=models.CASCADE, related_name="player_resource_instances")
    resource_template = models.ForeignKey(
        PlayerResourceTemplate, on_delete=models.CASCADE
    )
    current_ammount = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.resource_template.name} from game {self.game_player.game_instance.game_template.name} for {self.game_player.player.name}"


class Die(UUIDModel):
    game_template = models.ForeignKey(
        GameTemplate, on_delete=models.CASCADE, related_name="special_dice"
    )
    name = models.CharField(max_length=255)
    faces: models.Manager["DieFace"]

    def __str__(self):
        return self.name

    def edit_url(self):
        return reverse("special-die-edit", args=[self.id])

    def edit_faces_url(self):
        return reverse("special-die-faces-edit", args=[self.id])

    def delete_url(self):
        return reverse("die-delete", args=[self.id])

    def roll(self, number: int, roll_log):
        faces = []
        for face in self.faces.all():
            for i in range(0, face.count):
                faces.append(face)
        entries = [
            RollLogEntry(face=random.choice(faces), log=roll_log, die=self)
            for i in range(0, number)
        ]
        RollLogEntry.objects.bulk_create(entries)


class DieFace(UUIDModel):
    die = models.ForeignKey(Die, on_delete=models.CASCADE, related_name="faces")
    name = models.CharField(max_length=255)
    count = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"face {self.name} for die {self.die.name} from game {self.die.game_template.name}"


class RollLog(UUIDModel):
    game_player = models.ForeignKey(GamePlayer, on_delete=models.CASCADE)
    entries: models.Manager["RollLogEntry"]


class RollLogEntry(UUIDModel, TimeStampedModel):
    log = models.ForeignKey(RollLog, on_delete=models.CASCADE, related_name="entries")
    die = models.ForeignKey(
        Die, on_delete=models.CASCADE, related_name="roll_entries"
    )
    face = models.ForeignKey(
        DieFace, on_delete=models.CASCADE, related_name="roll_entries"
    )
    is_archived = models.BooleanField(default=False)


def generate_roll_log_template_data(game_player):
    data = {}
    data["dice_rolled"] = Die.objects.filter(
        roll_entries__is_archived=False,
        roll_entries__log__game_player=game_player,
    ).annotate(num_rolled=models.Count("roll_entries"))
    data["face_counts"] = DieFace.objects.filter(
        roll_entries__is_archived=False,
        roll_entries__log__game_player=game_player,
    ).annotate(num_rolled=models.Count("roll_entries"))
    data["most_recent_rolls"] = RollLogEntry.objects.prefetch_related("die", "face").filter(
        is_archived=False,
        log__game_player=game_player,
    ).order_by("-created")[:10]
    return data
