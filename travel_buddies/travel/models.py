from django.db import models
from travel_buddies.accounts.models import UserProfile
# Create your models here.

class Trip(models.Model):
    class Transportation(models.TextChoices):
        PLANE = ('PLANE','Plane')
        CAR = ('CAR', 'Car')
        TRAIN = ('TRAIN', 'Train')
        BOAT = ('BOAT', 'Boat')
    class Stay(models.TextChoices):
        HOTEL = ('HOTEL', 'Hotel')
        HOSTEL = ('HOSTEL', 'Hostel')
        AIRBNB = ('AIRBNB', 'Airbnb')
        CAMPING = ('CAMPING', 'Camping')
    user = models.ManyToManyField(UserProfile, related_name='trips')
    destination = models.TextField()
    transportation = models.TextField(choices = Transportation.choices)
    stay = models.TextField(choices = Stay.choices)