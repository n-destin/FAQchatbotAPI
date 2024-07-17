from django.shortcuts import render, redirect
from django.http import HttpResponse
from pymongo import MongoClient
from .serializers import ConversationSerializer, MessageSerializer, FeedbackSerializer, UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Message, Conversation, Feedback
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, alogin, logout, get_user_model
from django.contrib.auth.decorators import login_required# Create your views here.

class NaviagationViewSet(viewsets.ModelViewSet):
    
    def home(request):
        return HttpResponse("You are home!")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=["post"])
    def crate_user(self, request):
        email = request.data.get('email')
        # make sure ther
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        try:
            user = User.objects.create_user(first_name = first_name, last_name = last_name, email = email)
        except:
            user == None
        if user != None:
            alogin(request, user) # saves the user id in the session
            redirect("/")
        return Response(status = status.HTTP_200_OK)
    def authenticate_user(request):
        user = authenticate(email = request.data.email)
        if user:
            alogin(request, user)
        else:
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_200_OK) # everything is good
    
    def logout_user(request):
        logout(request)
        redirect('/login')


class conversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    seriazeer_class = ConversationSerializer
    
    # get the user id form the authentication path
    @login_required
    def create_conversation(self, request):
        owner_id = request.session.get('_auth_user_id')
        conversation_name = request.data.get('conversation_name')
        owner = User.objects.get(id = owner_id)
        conversation = conversation.objects.create(owner = owner, conversation_name = conversation_name)
        serializer = conversationViewSet(conversation)

        return Response(data = serializer.data["first_name"], status = status.HTTP_200_OK)
    
    def rename_converstaion(self, request):
        conversation = Conversation.objects.get(owner = request.data.get('owner'), conversation_name = request.data.get('conversation_name'), date = request.data.get('date'))
        serialized_conversation = ConversationSerializer(conversation)
        if conversation:
            serialized_conversation['name'] = request.data.get('new_name')
            return Response(data = serialized_conversation['new_name'], status = status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)