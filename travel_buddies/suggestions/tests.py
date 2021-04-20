from django.test import TestCase
from django.contrib.auth.models import User
from travel_buddies.accounts.models import UserProfile
from travel_buddies.travel.models import Trip
from travel_buddies.suggestions.serializers import SuggestionsSerializer
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class SuggestionsSerializerCase(TestCase):
    def setUp(self):
        temp_user = User.objects.create(username='bob', password='123')
        temp_profile = UserProfile.objects.create(user=temp_user)
        self.temp_profile=temp_profile

        trip = Trip.objects.create(destination='Hawaii', transportation='PLANE', stay='HOTEL')
        self.trip=trip
       

    def test_valid_serializer(self):
        now = datetime.now()
        serializer = SuggestionsSerializer(
        data={
            'user_id': self.temp_profile.user.id,
            'trip_plan_id': self.trip.id,
            'start_date':'2021-04-20T15:05:04.472750',
            'end_date':'2021-04-20T15:05:15.312563',
            'vote':2
        })
        assert serializer.is_valid()
        # self.assertEqual(serializer.validated_data, {
        #     'user_id': self.temp_profile.user.id,
        #     'trip_plan_id': self.trip.id,
        #     'start_date':'2021-04-20T15:05:04.472750',
        #     'end_date':'2021-04-20T15:05:15.312563',
        #     'vote':2
        # })
        assert serializer.errors == {}
