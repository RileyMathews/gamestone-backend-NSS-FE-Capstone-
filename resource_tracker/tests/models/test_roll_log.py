from django.test import TestCase
from resource_tracker.models import Die, DieFace, RollLogEntry, generate_roll_log_template_data
from ..factories.roll_log_factory import RollLogFactory

class RollLogTestCase(TestCase):
    def test_roll_log_template_data(self):
        roll_log = RollLogFactory.create()
        die = Die.objects.create(
            game_template=roll_log.game_player.game_instance.game_template,
            name="test"
        )
        face_1 = DieFace.objects.create(die=die, name="face 1")

        [
            RollLogEntry.objects.create(
                log=roll_log,
                die=die,
                face=face_1
            )
            for i in range(0, 5)
        ]

        data = generate_roll_log_template_data(roll_log.game_player)
        self.assertEqual(data["dice_rolled"].first().num_rolled, 5)
        self.assertEqual(data["face_counts"].first().num_rolled, 5)
