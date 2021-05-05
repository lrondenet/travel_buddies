from travel_buddies.suggestions.models import Suggestions
from travel_buddies.suggestions.serializers import SuggestionsSerializer
from rest_framework import generics
from rest_framework import permissions
from travel_buddies.suggestions.permissions import IsOwnerOrReadOnly, IsOwnerNotEditableOrReadOnly
from travel_buddies.accounts.models import UserProfile


class SuggestionsList(generics.ListCreateAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerNotEditableOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)



class SuggestionsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


