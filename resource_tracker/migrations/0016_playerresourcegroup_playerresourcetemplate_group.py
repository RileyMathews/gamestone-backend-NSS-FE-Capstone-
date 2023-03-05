# Generated by Django 4.1.7 on 2023-03-05 21:52

from django.db import migrations, models
import django.db.models.deletion
import model_utils.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("resource_tracker", "0015_alter_playerresourceinstance_game_player"),
    ]

    operations = [
        migrations.CreateModel(
            name="PlayerResourceGroup",
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
                ("name", models.CharField(max_length=255)),
                (
                    "game_template",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="resource_tracker.gametemplate",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="playerresourcetemplate",
            name="group",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="resource_tracker.playerresourcegroup",
            ),
        ),
    ]
