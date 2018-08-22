from rest_framework import viewsets
from api.models import UserGame
from api.serializers import UserGameSerializer

class UserGameViewset(viewsets.ModelViewSet):
    """ class for user game viewset """
    queryset = UserGame.objects.all()
    serializer_class = UserGameSerializer