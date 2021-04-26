from django.shortcuts import render
from travel_buddies.suggestions.models import Suggestions
from travel_buddies.suggestions.serializers import SuggestionsSerializer
from rest_framework import generics



class SuggestionsList(generics.ListCreateAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer


class SuggestionsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer


