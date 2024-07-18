from django.urls import path 
from .views import conversationViewSet, UserViewSet, NaviagationViewSet

urlpatterns = [
    path("", NaviagationViewSet.home, name = "index"),
    path("login", NaviagationViewSet.home, name = "logging someone in")
]