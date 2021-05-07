from django.urls import path
from travel_buddies.suggestions import views


urlpatterns = [
    path('suggestions/', views.SuggestionsList.as_view()),
    path('suggestions/<int:pk>/', views.SuggestionsDetail.as_view()),
    path('vote/', views.VoteList.as_view()),
    path('vote/<int:pk>/', views.VoteDetail.as_view())
]