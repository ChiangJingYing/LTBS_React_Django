from django.urls import path

from .views import *

urlpatterns = [
    path('', ManagerView.as_view()),
]
