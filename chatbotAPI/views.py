from django.contrib.auth.base_user import AbstractBaseUser
from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse
from pymongo import MongoClient
from .serializers import ConversationSerializer, MessageSerializer, FeedbackSerializer, UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import viewsets
from .models import Message, Conversation, Feedback
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.authentication import get_authorization_header, TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
import json
import re
from django.contrib.auth.backends import ModelBackend
from generation.responseformatting import process_response
from generation.azure_configuration import generate
from .PasswordGenerator import generate_password
from generation.embeddings_generation import generate_reference_documents
password_length = 12


def get_messages(messageIds):
    if len(messageIds) > 0:
        return [{"message" : Message.objects.get(message_id).content, "date" : Message.objects.get(message_id).date_created} for message_id in messageIds]

    return []


# class customeBackend(ModelBackend):
#     def authenticate(self, request: HttpRequest, username: str | None = ..., password: str | None = ..., **kwargs: json.Any) -> AbstractBaseUser | None:
#         return super().authenticate(request, username, password, **kwargs)


class NaviagationViewSet(viewsets.ModelViewSet):
    @csrf_exempt
    @api_view(["POST", ])
    def home(request):

        return Response(data="someone logged in")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


    def verify_email(email_adress):
        return re.match("*@ppg.com", email_adress) and (User.objects.get(email = email_adress) == None) # a unique and PPG email adress
    
    @csrf_exempt 
    @api_view(("post", ))
    def authenticate_user(request):
        data = json.loads(request.body)
        print(data)
        user = authenticate(username = data['email'], password = data['password'])
        if user:
            print('creating token to return')
            token, created = Token.objects.get_or_create(user = user)
            return Response(data={"userToken" : token.key}, status=status.HTTP_200_OK)
        else:
            print('there is no such user')
            return Response(status = status.HTTP_400_BAD_REQUEST, data = {"message" : ""})
    
        # @action(detail=False, methods=["post"])
    @csrf_exempt
    @api_view(("POST",))
    def create_user(request):
        data = json.loads(request.body)
        # there are more things to check
        # makte the user's username the same as the email
        if re.match("@ppg.com", data["email"]): # might be wrong. 
            return Response(response = False, status=status.HTTP_400_BAD_REQUEST)
        password = generate_password(password_length)
        # send an email to the user to give them the password
        user = User.objects.create_user(first_name = data["first_name"], last_name = data['last_name'], email = data['email'], username = data["email"], password=data['password'])
        if user != None:
            token, created = Token.objects.get_or_create(user = user)
            return Response(data = {'userToken': token.key}, status=status.HTTP_200_OK)
        else:
            return Response(data= False, status = status.HTTP_102_PROCESSING)


    @csrf_exempt
    @api_view(("POST", ))
    def authorize_user(request):
        auth_header = get_authorization_header(request=request).split()
        if not auth_header or auth_header[0].lower() != b'token':
            raise AuthenticationFailed("User not logged in")

        if len(auth_header) == 1:
            raise AuthenticationFailed("Invalid Toeken header. No credentials provided.")
        try:
            token = auth_header[0].decode()
            print(token)
            token_object = Token.objects.get(key = token)
        except:
            raise AuthenticationFailed("Invalid Token")
        user = token_object.user
        
        if user:
            return True
        else:
            return False
    
    def logout_user(request):
        logout(request)
        redirect('/login')


class conversationViewSet(APIView):
    queryset = Conversation.objects.all()
    seriazeer_class = ConversationSerializer
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    
    
    @api_view(("GET", ))
    @permission_classes([IsAuthenticated])
    def get_messages(request):
        conversation = Conversation.objects.get(owner = request.user, id = request.GET["conversationKey"])
        if conversation:
            return Response(data={
                "messages": [
                    {
                        "content": message.content,  # Use the message's content
                        "date_created": message.date_created,  # Use the message's creation date
                        "sender" : message.sender
                    } for message in conversation.messages.all()
                ]
            }, status=status.HTTP_200_OK)
        return Response(data = None, status=status.HTTP_400_BAD_REQUEST)
    
    
    # @api_view(["POST", ])
    # @permission_classes([IsAuthenticated])
    # def handle_new_message(request):
    #     conversation = Conversation.objects.get(owner = request.user, id = request.data.conversation_id)
    #     message = Message.objects.create(owner = request.user, content = request.data.content)
    #     if message:
    #         conversation.messages.add(message)
    #         conversation.save()
        
    #     return get_messages(request)

    
    @api_view(("GET", ))
    @permission_classes([IsAuthenticated])
    def get_conversations(request):
        conversations = [{"conversation_id" : conversation.id, "conversation_name" : conversation.conversation_name} for conversation in Conversation.objects.filter(owner = request.user)]
        if conversations:
            return Response(data={"conversations" : conversations}, status=status.HTTP_200_OK)
        return Response(data=None, status=status.HTTP_400_BAD_REQUEST)

    # @login_required
    
    @csrf_exempt
    @api_view(("POST",))
    @permission_classes([IsAuthenticated])
    def handle_new_message(request):
        conversation = Conversation.objects.get(id = request.data["conversation_key"], owner = request.user)
        if conversation == None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="Conversation not found")
        messages = []
        for message in conversation.messages.all():
            if message != None:
                messages.append(Message.objects.get(id = message.id).content)
        reference_documents = generate_reference_documents(request.data["content"])
        prompt = f''''
            DOCUMENT:
                {reference_documents}
                QUESTION:
                {request.data["content"]}
                INSTRUCTIONS:
                You are an assistant and you help people find information.
                Answer the users QUESTION using the Questions and answer pairs in the DOCUMENT text above.
                Keep your answer ground in the facts of the DOCUMENT. 
                Make sure the response has string format identifiers such as '\n' , among others.
        '''
        result = generate(prompt, messages)
        processed = process_response(result)
        new_message = Message.objects.create(content = request.data["content"], owner = request.user, sender = "user")
        response_message = Message.objects.create(content = result, owner = request.user, sender = "Assistant")
        if response_message:
            conversation.messages.add(new_message)
        if new_message:
            conversation.messages.add(response_message)
        
        return Response(status = status.HTTP_200_OK, data = {"messages" : [{"content" : message.content, "date_created" : message.date_created, "sender" : message.sender} for message in Conversation.objects.get(id = request.data["conversation_key"]).messages.all()]})
    
    # get the user id form the authentication path
    # @login_required
    @csrf_exempt
    @api_view(("POST",))
    @permission_classes([IsAuthenticated])
    def create_conversation(request):
        conversation_name = request.data.get('conversation_name')
        owner = User.objects.get(id = request.user.id)
        conversation = Conversation.objects.create(owner = owner, conversation_name = conversation_name)
        if conversation:
            conversations = [{"id" : conversation.id, "name" : conversation.conversation_name} for conversation in Conversation.objects.filter(owner = owner)]
            return Response(data={
                "conversations": conversations,
                "conversationKey": conversation.id,
                "messages": [
                    {
                        "content": message.content,  # Use the message's content
                        "date_created": message.date_created  # Use the message's creation date
                    } for message in conversation.messages.all()
                ]
    }, status=status.HTTP_200_OK)
        return Response(data={"message" : "Error"}, status= status.HTTP_408_REQUEST_TIMEOUT)
    # @permission_classes([IsAuthenticated])
    def rename_converstaion(self, request):
        conversation = Conversation.objects.get(owner = request.data.get('owner'), conversation_name = request.data.get('conversation_name'), date = request.data.get('date'))
        serialized_conversation = ConversationSerializer(conversation)
        if conversation:
            serialized_conversation['name'] = request.data.get('new_name')
            return Response(data = serialized_conversation['new_name'], status = status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    