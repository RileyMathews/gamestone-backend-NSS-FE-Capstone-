from rest_framework import viewsets
from api.models import UserPlatform
from api.serializers import UserPlatformSerializer
from rest_framework.permissions import IsAuthenticated

class UserPlatformViewset(viewsets.ModelViewSet):
    """ class for user game viewset """
    permission_classes = (IsAuthenticated,)
    queryset = UserPlatform.objects.all()
    serializer_class = UserPlatformSerializer

    def get_queryset(self):
        """ method to control the query of the users table
            The view should filter by active users if the url contains the filter
        """
        queryset = UserPlatform.objects.filter(user=self.request.user)


        return queryset