from django.db import models
from datetime import date
from django.contrib.auth.models import User 
from django.utils import timezone
from django.contrib import admin

# Create your models here
global max_length
max_length  = 150


class Conversation(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation_name = models.CharField( max_length= max_length) # name the conversation after the first question
    date = models.DateField(default = timezone.now)
    
    def __str__(self):
        return self.conversation_name
    
    @classmethod
    def create_conversation():
        pass

    @classmethod 
    def delete_conversation():
        pass
    
    @classmethod
    def rename_conversation():
        pass

    def delete_remaining(starting_date): # this method deletes all messages that were sent after a certain date, when the user deletes a message
        pass


class Message(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default = '1')
    conversation = models.ForeignKey(Conversation, on_delete = models.CASCADE, default = "1")
    content = models.TextField(default = "No content")
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content



class Feedback(models.Model):
    provider_name = models.CharField( max_length= max_length)
    date = models.DateTimeField(default=timezone.now)
    anonymous = models.BooleanField(default = False)
    team = models.CharField( max_length=max_length) # The team to which the feeback is adresed
    feedback_text = models.TextField(default = "No feedback")

    def __str__(self):
        return self.feedback_text

admin.site.register(Message)
admin.site.register(User)
admin.register(Conversation)
admin.register(Feedback)