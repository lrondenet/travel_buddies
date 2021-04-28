from django.shortcuts import render
from travel_buddies.suggestions.models import Suggestions
from travel_buddies.suggestions.serializers import SuggestionsSerializer
from rest_framework import generics
from rest_framework import permissions
from travel_buddies.accounts.models import UserProfile


class SuggestionsList(generics.ListCreateAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        auth_id = self.request.user.id
        user_profile = UserProfile.objects.get(user_id=auth_id)
        print(repr(user_profile))
        # serializer.save(user=self.request.user_id)



class SuggestionsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


