from django.contrib.auth.models import User
from travel_buddies.accounts.models import UserProfile
from travel_buddies.accounts.serializers import UserProfileSerializer
from travel_buddies.accounts.permissions import (IsOwnerOrReadOnly, IsSuperUserOrReadOnly)
from rest_framework import generics


class UserList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer



class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]



