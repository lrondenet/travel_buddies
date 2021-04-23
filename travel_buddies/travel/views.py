# from django.http import HttpResponse, JsonResponse
# from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from travel_buddies.travel.models import Trip
from travel_buddies.travel.serializers import TripSerializer



# @csrf_exempt
@api_view(['GET', 'POST'])
def trip_list(request, format=None):
    if request.method == 'GET':
        trips = Trip.objects.all()
        serializer = TripSerializer(trips, many=True)
        # Renders to content type as requested by the client
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TripSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
# @csrf_exempt   
def trip_detail(request, pk, format=None):
    try:
        trip = Trip.objects.get(pk=pk)
    except Trip.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TripSerializer(trip)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TripSerializer(trip, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        trip.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    