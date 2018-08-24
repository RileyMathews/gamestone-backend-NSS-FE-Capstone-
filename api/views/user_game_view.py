from rest_framework import viewsets
from api.models import UserGame
from api.serializers import UserGameSerializer
from rest_framework.permissions import IsAuthenticated

class UserGameViewset(viewsets.ModelViewSet):
    """ class for user game viewset """
    permission_classes = (IsAuthenticated,)
    queryset = UserGame.objects.all()
    serializer_class = UserGameSerializer

    def get_queryset(self):
        """ method to control the query of the users table
            The view should filter by active users if the url contains the filter
        """
        queryset = UserGame.objects.filter(user=self.request.user)

        return queryset