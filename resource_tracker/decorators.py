from django.urls import reverse
from django.shortcuts import redirect
from django.http import HttpRequest
from . import models

import functools


def player_required(func):
    @functools.wraps(func)
    def wrapper(request: HttpRequest, *args, **kwargs):
        user = request.user
        if hasattr(user, 'player'):
            return func(request,*args, **kwargs)
        
        return redirect(f"{reverse('player-create')}?next={request.path}")
    return wrapper
