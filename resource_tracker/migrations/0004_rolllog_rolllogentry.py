# Generated by Django 4.1.7 on 2023-02-17 22:36

from django.db import migrations, models
import django.db.models.deletion
import model_utils.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
        (
            "resource_tracker",
            "0003_remove_playerresourceinstance_max_ammount_override_and_more",
        ),
    ]

    operations = [
        migrations.CreateModel(
            name="RollLog",
            fields=[
                (
                    "id",
                    model_utils.fields.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "game_instance",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="resource_tracker.gameinstance",
                    ),
                ),
                (
                    "player",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="resource_tracker.player",
                    ),
                ),
            ],
            options={
                "unique_together": {("player", "game_instance")},
            },
        ),
        migrations.CreateModel(
            name="RollLogEntry",
            fields=[
                (
                    "id",
                    model_utils.fields.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "die",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="resource_tracker.specialdie",
                    ),
                ),
                (
                    "face",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="resource_tracker.specialdieface",
                    ),
                ),
                (
                    "log",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="entries",
                        to="resource_tracker.rolllog",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
