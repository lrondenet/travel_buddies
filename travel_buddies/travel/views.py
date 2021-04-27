from travel_buddies.travel.models import Trip
from travel_buddies.travel.serializers import TripSerializer
from rest_framework import generics



class TripList(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer




    
