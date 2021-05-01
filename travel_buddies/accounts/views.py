from django.contrib.auth.models import User
from travel_buddies.accounts.models import UserProfile
from travel_buddies.accounts.serializers import UserProfileSerializer
from travel_buddies.accounts.permissions import IsOwnerOrReadOnly
from rest_framework import generics


class UserList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    # def perform_update(self, serializer):
    #     user_data = validated_data.pop('user')
    #     # user = User.objects.get(**user_data)
    #     print('HELLO')
    #     print(self.request)
    #     print(validated_data)
    #     return 

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]



