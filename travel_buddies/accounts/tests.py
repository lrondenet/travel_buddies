from django.test import TestCase
from django.contrib.auth.models import User
from travel_buddies.accounts.serializers import UserProfile
from travel_buddies.accounts.serializers import UserSerializer
import logging

logger = logging.getLogger(__name__)

class UserSerializerCase(TestCase):
    def setUp(self):
        temp_user = User.objects.create(username='bob', password='123')
        self.temp_user=temp_user

    def test_valid_serializer(self):
        serializer = UserSerializer(data={'user':self.temp_user.id, 'address1':'1234 broadway', 'zipcode':94501, 'city':'Oakland', 'phone':'3452342345'})
        assert serializer.is_valid()
