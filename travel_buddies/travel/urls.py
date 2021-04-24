from django.urls import path
from travel_buddies.travel import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('trips/', views.TripList.as_view()),
    path('trips/<int:pk>/', views.TripDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)