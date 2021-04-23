from django.urls import path
from travel_buddies.travel import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('trips/', views.trip_list),
    path('trips/<int:pk>/', views.trip_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)