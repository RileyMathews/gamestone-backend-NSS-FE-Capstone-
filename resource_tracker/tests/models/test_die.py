from django.test import TestCase
from resource_tracker.models import Die, DieFace
from ..factories.roll_log_factory import RollLogFactory


class DieTestCase(TestCase):
    def test_can_roll_dice(self):
        roll_log = RollLogFactory.create()
        die = Die.objects.create(
            game_template=roll_log.game_player.game_instance.game_template, name="test"
        )
        [DieFace.objects.create(die=die, name=name) for name in ["1", "2"]]

        die.roll(10, roll_log)

        for entry in roll_log.entries.all():
            self.assertEqual(entry.die, die)
