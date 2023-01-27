import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render, redirect, HttpResponse, get_object_or_404
from django.urls import reverse
from urllib.parse import quote_plus, urlencode
from .models import OpenIDProvider, OpenIDIdentity
from django.http import HttpRequest


def login(request: HttpRequest, slug):
    provider = get_object_or_404(OpenIDProvider, slug=slug)
    return provider.openid_client().authorize_redirect(
        request, request.build_absolute_uri(reverse("callback"))
    )

def index(request):
    return HttpResponse(json.dumps(request.session.get("user"), indent=4))


def callback(request, slug):
    provider = get_object_or_404(OpenIDProvider, slug=slug)
    token = provider.openid_client().authorize_access_token(request)
    # login user or do things with token
    return redirect(request.build_absolute_uri(reverse("index")))


def logout(request):
    # logout user from django

    return redirect(
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
        + urlencode(
            {
                "returnTo": request.build_absolute_uri(reverse("index")),
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        ),
    )
