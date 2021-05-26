from travel_buddies.suggestions.models import Suggestions, Vote
from travel_buddies.suggestions.serializers import SuggestionsSerializer, VoteSerializer
from rest_framework import generics
from rest_framework import permissions
from travel_buddies.suggestions.permissions import IsOwnerOrReadOnly, NotEditableAndReadOnly
from travel_buddies.accounts.models import UserProfile
import django_filters.rest_framework


class SuggestionsList(generics.ListCreateAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['id', 'trip_plan']

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


class SuggestionsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, NotEditableAndReadOnly]


class VoteList(generics.ListCreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(user_id=self.request.user.id)



class VoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]