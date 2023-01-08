from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth import login
from django.forms import Form
from .models import User
import uuid

# Create your views here.

class TemporaryUserLogin(View):
    def get(self, request):
        return render(request, "identity/temporary_login.html")

    def post(self, request):
        user = User.objects.create(
            first_name="Temporary",
            last_name="User",
            gamertag=uuid.uuid4(),
            is_temporary=True
        )
        user.set_unusable_password()
        user.save()
        login(request, user)
        return redirect("gamestone_app")
        
