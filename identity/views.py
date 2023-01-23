from django.shortcuts import render, redirect, HttpResponseRedirect
from django.views.generic import View
from django.contrib.auth import login, logout
from django.contrib.auth.views import RedirectURLMixin
from .models import User
import uuid

# Create your views here.


class TemporaryUserLogin(RedirectURLMixin, View):
    def get(self, request):
        return render(request, "identity/temporary_login.html")

    def post(self, request):
        user = User.objects.create(
            first_name="Temporary",
            last_name="User",
            username=uuid.uuid4(),
            is_temporary=True,
        )
        user.set_unusable_password()
        user.save()
        login(request, user)
        return HttpResponseRedirect(self.get_success_url())


class LogoutView(RedirectURLMixin, View):
    next_page = "/"

    def post(self, request):
        logout(request)
        return HttpResponseRedirect(self.get_success_url())
