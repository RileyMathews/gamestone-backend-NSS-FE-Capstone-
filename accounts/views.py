import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render, redirect, HttpResponse, get_object_or_404
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.urls import reverse
from urllib.parse import quote_plus, urlencode
from .models import OpenIDProvider, OpenIDIdentity
from django.http import HttpRequest


def login(request: HttpRequest, slug):
    provider = get_object_or_404(OpenIDProvider, slug=slug)
    return provider.openid_client().authorize_redirect(
        request, request.build_absolute_uri(reverse("oauth2_callback", args=[slug]))
    )

def index(request, slug):
    return HttpResponse(request.user.open_id_identity.subject_identifier)


def callback(request, slug):
    provider = get_object_or_404(OpenIDProvider, slug=slug)
    token = provider.openid_client().authorize_access_token(request)
    subject_identifier = token['userinfo']['sub']
    # TODO: add ability to link multiple identities
    identity = OpenIDIdentity.get_or_create_identity(subject_identifier, provider)
    django_login(request, identity.user)
    return redirect(request.build_absolute_uri(reverse("index")))


def logout(request: HttpRequest):
    logged_in_user = request.user
    open_id_identity_provider = logged_in_user.open_id_identity.provider
    django_logout(request)

    return redirect(open_id_identity_provider.logout_url())
