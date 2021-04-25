from django.test import TestCase
from travel_buddies.accounts.serializers import UserProfile
from travel_buddies.accounts.serializers import UserSerializer
import logging

logger = logging.getLogger(__name__)

# class UserSerializerCase(TestCase):
#     def setup(self):
#         lauren = User.objects.get(id=1)
#     def test_valid_serializer(self):
#         serializer = UserSerializer(data={'user':'lauren', 'address1':'1234 broadway', 'zipcode':94501, 'city':'Oakland', 'phone':'3452342345'})
#         logger.error(repr(serializer))
#         assert serializer.is_valid()
