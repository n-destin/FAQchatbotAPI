from django.urls import path
from .views import conversationViewSet, UserViewSet, NaviagationViewSet

urlpatterns = [
    path("/register", UserViewSet.create_user, name = "create_user"),
    path("/login", UserViewSet.authenticate_user, name = "user_login")
]