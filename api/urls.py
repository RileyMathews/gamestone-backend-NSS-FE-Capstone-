from api import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register('user', views.UserViewset, basename='user')
router.register('usergame', views.UserGameViewset)

urlpatterns = router.urls
