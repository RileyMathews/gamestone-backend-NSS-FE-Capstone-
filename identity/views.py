from django.http import HttpRequest
from django.shortcuts import redirect
from django.contrib.auth import login
from .models import User
import uuid


def temporary_user_create(request: HttpRequest):
    user = User.objects.create_user(uuid.uuid4(), is_demo_user=True)
    login(request, user, backend="django.contrib.auth.backends.ModelBackend")
    next_url = request.GET.get("next")
    return redirect(next_url)
