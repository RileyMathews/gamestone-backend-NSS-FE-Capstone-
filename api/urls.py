from api import views
from rest_framework.routers import DefaultRouter
from django.urls import include, path
router = DefaultRouter()


urlpatterns = [
    path('user-auth/', include('rest_auth.urls')),
    path('user-auth/registration/', include('rest_auth.registration.urls')),
]

router.register('user', views.UserViewset, basename='user')
router.register('platform', views.PlatformViewset)
router.register('usergame', views.UserGameViewset)
router.register('userplatform', views.UserPlatformViewset)

urlpatterns += router.urls
