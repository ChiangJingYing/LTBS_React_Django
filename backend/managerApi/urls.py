from django.urls import path

from .views import *

urlpatterns = [
    path('token', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshPairView.as_view()),

    path('users/', ManageUserApi.as_view()),
    path('drivers/', ManageDriverApi.as_view()),
]
