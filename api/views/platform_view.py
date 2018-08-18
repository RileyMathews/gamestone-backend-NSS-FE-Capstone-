from rest_framework import viewsets
from api.models import Platform
from api.serializers import PlatformSerializer

class PlatformViewset(viewsets.ModelViewSet):
    """ viewset for the platform model """
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer