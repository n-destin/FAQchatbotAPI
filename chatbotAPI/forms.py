from django import forms 
from django.contrib.auth import get_user_model
from .models import max_length 

class RegisterForm(forms.Form):
    fist_name = forms.CharField(label = "First name: ", max_length=max_length)
    last_name = forms.CharField(label= "Last name: ", max_length= max_length)
    email = forms.EmailField(label= "PPG email adress: ")

