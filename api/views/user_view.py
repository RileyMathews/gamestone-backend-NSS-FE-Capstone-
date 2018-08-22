from rest_framework import viewsets
from api.models import User
from api.serializers import UserSerializer

class UserViewset(viewsets.ModelViewSet):
    """ viewset for the user model """
    # queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_queryset(self):
        """ method to control the query of the users table
            The view should filter by active users if the url contains the filter
        """
        queryset = models.User.objects.all()
        query_string = self.request.query_params.get('gamertag', None)

        # take the string value from the url and set a boolean value accordingly
        if query_string is not None:
            queryset = queryset.filter(gamertag=query_string)

        return queryset