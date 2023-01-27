from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest

@login_required
def app(request: HttpRequest):
    return render(
        request,
        "skyrim_helper/app.html"
    )
