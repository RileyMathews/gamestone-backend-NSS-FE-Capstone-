from django.urls import reverse
from django.shortcuts import redirect
from . import models

import functools


def player_required(func):
    @functools.wraps(func)
    def wrapper(request, *args, **kwargs):
        user = request.user
        if hasattr(user, 'player'):
            return func(request,*args, **kwargs)
        
        return redirect(reverse('player-create'))
    return wrapper
