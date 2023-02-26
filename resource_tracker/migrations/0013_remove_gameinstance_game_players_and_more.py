# Generated by Django 4.1.7 on 2023-02-26 20:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("resource_tracker", "0012_remove_gameresourcetemplate_game_template_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="gameinstance",
            name="game_players",
        ),
        migrations.AlterField(
            model_name="playerresourceinstance",
            name="game_player",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="player_resource_instances",
                to="resource_tracker.gameplayer",
            ),
        ),
    ]
