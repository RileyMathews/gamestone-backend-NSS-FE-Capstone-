from api import views
from rest_framework.routers import DefaultRouter
from django.urls import include, path
router = DefaultRouter()

router.register('user', views.UserViewset, base_name='user')
router.register('platform', views.PlatformViewset)
router.register('userGame', views.UserGameViewset)
router.register('userplatform', views.UserPlatformViewset)

urlpatterns = router.urls