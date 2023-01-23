from rest_framework import viewsets
from gamestone.models import UserGame
from gamestone.api.serializers import UserGameSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response


class UserGameViewset(viewsets.ModelViewSet):
    """class for user game viewset"""

    permission_classes = (IsAuthenticated,)
    queryset = UserGame.objects.all()
    serializer_class = UserGameSerializer

    def get_queryset(self):
        """method to control the query of the users table
        The view should filter by active users if the url contains the filter
        """
        queryset = UserGame.objects.filter(user=self.request.user)

        return queryset

    def create(self, request):
        serializer = UserGameSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
