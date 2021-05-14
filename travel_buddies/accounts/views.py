from django.contrib.auth.models import User
from travel_buddies.accounts.models import UserProfile
from travel_buddies.accounts.serializers import UserProfileSerializer
from travel_buddies.accounts.permissions import (IsOwnerOrReadOnly, IsSuperUserOrReadOnly)
from rest_framework import generics


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class UserList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer



class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        print(serializer.validated_data)
        print(user)
        token, created = Token.objects.get_or_create(user=user)
        print(token, created)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
