from faker import Faker
from django.contrib.auth.models import User
from travel_buddies.accounts.models import UserProfile


fake = Faker()

for i in range(100):
    temp_profile = fake.simple_profile()
    # User.objects.create_user(**temp_profile)
    user = User.objects.create_user(username=temp_profile['username'], email=temp_profile['mail'], password='lauren')
    UserProfile.objects.create(user=user, address1=temp_profile['address'], zipcode=fake.postcode(), city=fake.city(), country=fake.country(), phone=fake.phone_number())