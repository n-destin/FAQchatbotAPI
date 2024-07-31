from django.core.mail import send_mail
from django.conf import settings
settings.configure()

def send_email(address_list, subject, message):
    try:
        send_mail(subject, message, settings.EMAIL_HOST_USER, address_list)
        print("I send the email")
        return True
    except Exception as error:
        print("something went wrong", error)
        return False
    


send_email(["niyodestin73@gmail.com"], "Testing email sending", "Dear Destin, Please find the link attached to this email")
