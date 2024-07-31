import string
import random


def generate_password(length):
    uppercase_letters = string.ascii_uppercase
    lowercase_letters = string.ascii_lowercase
    digits = string.digits
    special_characters = string.punctuation
    choices = [uppercase_letters, lowercase_letters, digits, special_characters]
    
    password = []
    remaining = length
    for type_index in range(len(choices)):
        if type_index == 3:
            for _ in range(remaining): # times to append
                password.append(choices[type_index][random.randint(0, len(choices[type_index])) - 1])
        else:
            for _ in range(remaining + type_index - 4):
                password.append(choices[type_index][random.randint(0, len(choices[type_index])) - 1])
    
    random.shuffle(password)
    return "".join(password)