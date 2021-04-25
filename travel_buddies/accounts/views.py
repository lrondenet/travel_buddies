# from django.contrib.auth.models import User
from travel_buddies.accounts.models import UserProfile
from travel_buddies.accounts.serializers import UserSerializer
from rest_framework import generics


class UserList(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer



# should I add AuthUser too?
