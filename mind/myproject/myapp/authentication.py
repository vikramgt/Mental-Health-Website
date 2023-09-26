from django.contrib.auth.backends import BaseBackend
from myapp.models import user_id
from django.contrib.auth.hashers import make_password

class EmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = user_id.objects.get(email=email)
        except user_id.DoesNotExist:
            return None

        if user.check_password(password):
            return user

    def get_user(self, user_id):
        try:
            return user_id.objects.get(pk=user_id)
        except user_id.DoesNotExist:
            return None

def create_user(username, password, email, **extra_fields):
    password_hash = make_password(password)
    user = user_id.objects.create_user(username=username, password=password_hash, email=email, **extra_fields)
    return user

def create_superuser(username, password, email, **extra_fields):
    password_hash = make_password(password)
    user = user_id.objects.create_superuser(username=username, password=password_hash, email=email, **extra_fields)
    return user
