# Generated by Django 4.1.5 on 2023-01-07 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserGame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isFavorited', models.BooleanField()),
                ('giantbomb_game', models.IntegerField()),
            ],
        ),
    ]
