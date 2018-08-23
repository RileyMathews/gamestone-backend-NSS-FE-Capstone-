from rest_framework import viewsets
from api.models import UserPlatform
from api.serializers import UserPlatformSerializer

class UserPlatformViewset(viewsets.ModelViewSet):
    """ class for user game viewset """
    queryset = UserPlatform.objects.all()
    serializer_class = UserPlatformSerializer