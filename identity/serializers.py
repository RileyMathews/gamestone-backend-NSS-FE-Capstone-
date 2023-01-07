from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class UserRegistrationSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    is_temporary = serializers.BooleanField()

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'is_temporary': self.validated_data.get('is_temporary', False),
        }

    def save(self, request):
        user = super(UserRegistrationSerializer, self).save(request)
        if self.validated_data.get('is_temporary', False):
            user.is_temporary = True
            user.save()

        return user
