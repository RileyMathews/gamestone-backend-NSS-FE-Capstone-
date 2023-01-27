from rest_framework import routers
from django.urls import path, include
from .api.viewsets import PlayerCharacterViewset

router = routers.DefaultRouter()
router.register("player-characters", PlayerCharacterViewset)

urlpatterns = [
    path("api/", include(router.urls))
]
