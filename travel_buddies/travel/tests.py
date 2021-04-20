from django.test import TestCase
from travel_buddies.travel.models import Trip
from travel_buddies.travel.serializers import TripSerializer
from rest_framework.renderers import JSONRenderer
import io
import logging

logger = logging.getLogger(__name__)

class TravelSerlizerCase(TestCase):
    def test_valid_serializer(self):
        serializer = TripSerializer(data={'destination':'Hawaii','transportation':'PLANE', 'stay':'HOTEL', 'foo':'bar'})
        assert serializer.is_valid()
        # only cares about the three fields: destination, transportation, stay
        assert serializer.validated_data == {'destination':'Hawaii','transportation':'PLANE', 'stay':'HOTEL'}
        assert serializer.data == {'destination':'Hawaii','transportation':'PLANE', 'stay':'HOTEL'}
        assert serializer.errors == {}