from django.contrib.auth.models import User
from travel_buddies.accounts.models import UserProfile
from travel_buddies.accounts.serializers import UserSerializer
from rest_framework import generics


class UserList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer



# Todo;
# need to change user edit to not pass in user id

