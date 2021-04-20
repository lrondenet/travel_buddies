from django.test import TestCase
from travel_buddies.suggestions.serializers import SuggestionsSerializer
import logging

logger = logging.getLogger(__name__)

class UserSerializerCase(TestCase):
    def test_valid_serializer(self):
        serializer = SuggestionsSerializer(data={'start_date':'04/20/21','end_date':'04/24/21','vote':2})
        logger.error(repr(serializer))
        assert serializer.is_valid()
