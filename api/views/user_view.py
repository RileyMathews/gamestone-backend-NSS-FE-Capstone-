from rest_framework import viewsets
from api.models import User
from api.serializers import UserSerializer

class UserViewset(viewsets.ModelViewSet):
    """ viewset for the user model """
    queryset = User.objects.all()
    serializer_class = UserSerializer