from travel_buddies.travel.models import Trip
from travel_buddies.travel.serializers import TripSerializer
from rest_framework import generics
from rest_framework import permissions



class TripList(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer




    
