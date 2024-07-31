from django.urls import path, include
from .views import conversationViewSet, UserViewSet, NaviagationViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenObtainPairView, TokenVerifyView
)

urlpatterns = [
    path("", NaviagationViewSet.home, name = "index"),
    path("authenticate/token", TokenObtainPairView.as_view(), name = "token_obtain_pair"),
    path("authenticate/api/verify", TokenVerifyView.as_view(), name = "token_verify"),
    path("authenticate/token.refresh", TokenRefreshView.as_view(), name = "token_refresh"),
    path("authenticate/login", UserViewSet.authenticate_user, name = "user_login"),
    path("authenticate/register", UserViewSet.create_user, name = "create_user"),
    path("conversation/create", conversationViewSet.create_conversation, name = "new conversation"),
    path("conversation/all", conversationViewSet.get_conversations, name = "get conversations"),
    path("messages/all", conversationViewSet.get_messages, name = "get conversation messages"), 
    path("messages/new", conversationViewSet.handle_new_message, name = "new message")
]