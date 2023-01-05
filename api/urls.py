from api import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register('user', views.UserViewset, basename='user')
router.register('platform', views.PlatformViewset)
router.register('usergame', views.UserGameViewset)
router.register('userplatform', views.UserPlatformViewset)

urlpatterns = router.urls
