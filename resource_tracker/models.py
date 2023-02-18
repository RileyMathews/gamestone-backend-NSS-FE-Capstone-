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

    def player_resource_edit_url(self):
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
    min_ammount = models.IntegerField(default=0)
    max_ammount = models.IntegerField(default=10000)

    def __str__(self):
        return f"{self.name} from {self.game_template.name}"


class GameInstance(UUIDModel):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="owned_game_instances"
    )
    game_template = models.ForeignKey(GameTemplate, on_delete=models.CASCADE)
    join_code = models.CharField(
        default=create_random_join_code, max_length=4, unique=True
    )
    players = models.ManyToManyField(Player)

    def __str__(self):
        return self.name
    
    def detail_url(self):
        return reverse("game-instance-detail", args=[self.id])
    
    def visible_resources_edit_url(self):
        return reverse("player-hidden-resources-edit", args=[self.id])

    def play_url(self):
        return reverse("game-instance-play", args=[self.id])

    def delete_url(self):
        return reverse("game-instance-delete", args=[self.id])

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

    def __str__(self):
        return self.resource_template.name


class PlayerResourceInstance(UUIDModel):
    owner = models.ForeignKey(Player, on_delete=models.CASCADE)
    game_instance = models.ForeignKey(GameInstance, on_delete=models.CASCADE)
    resource_template = models.ForeignKey(
        PlayerResourceTemplate, on_delete=models.CASCADE
    )
    current_ammount = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.resource_template.name} from game {self.game_instance.game_template.name} for {self.owner.name}"


class SpecialDie(UUIDModel):
    game_template = models.ForeignKey(GameTemplate, on_delete=models.CASCADE, related_name="special_dice")
    name = models.CharField(max_length=255)
    faces: models.Manager["SpecialDieFace"]

    def __str__(self):
        return self.name
    
    def edit_url(self):
        return reverse("special-die-edit", args=[self.id])
    
    def edit_faces_url(self):
        return reverse("special-die-faces-edit", args=[self.id])

    def roll(self) -> "SpecialDieFace":
        faces = []
        for face in self.faces.all():
            for i in range(0, face.count):
                faces.append(face)
        return random.choice(faces)

class SpecialDieFace(UUIDModel):
    die = models.ForeignKey(SpecialDie, on_delete=models.CASCADE, related_name="faces")
    name = models.CharField(max_length=255)
    count = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"face {self.name} for die {self.die.name} from game {self.die.game_template.name}"


class RollLog(UUIDModel):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    game_instance = models.ForeignKey(GameInstance, on_delete=models.CASCADE)
    entries: models.Manager["RollLogEntry"]

    class Meta:
        unique_together = ['player', 'game_instance']

    def generate_template_data(self):
        data = {
            "dice_rolled": {},
            "face_counts": {}
        }
        for entry in self.entries.filter(is_archived=False):
            if entry.die.name in data["dice_rolled"].keys():
                data["dice_rolled"][entry.die.name] += 1
            else:
                data["dice_rolled"][entry.die.name] = 1

            if entry.face.name in data["face_counts"].keys():
                data["face_counts"][entry.face.name] += 1
            else:
                data["face_counts"][entry.face.name] = 1

        data["most_rcent_rolls"] = [  # type: ignore
            {"die": entry.die.name, "face": entry.face.name}
            for entry in self.entries.filter(is_archived=False).order_by("-created")[:10]
        ]

        return data

class RollLogEntry(UUIDModel, TimeStampedModel):
    log = models.ForeignKey(RollLog, on_delete=models.CASCADE, related_name="entries")
    die = models.ForeignKey(SpecialDie, on_delete=models.CASCADE)
    face = models.ForeignKey(SpecialDieFace, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)
