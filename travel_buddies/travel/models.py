from django.db import models

# Create your models here.

class Trip(models.Model):
    class Transporation(models.TextChoices):
        PLANE = ('PLANE','Plane')
        CAR = ('CAR', 'Car')
        TRAIN = ('TRAIN', 'Train')
        BOAT = ('BOAT', 'Boat')
    class Stay(models.TextChoices):
        HOTEL = ('HOTEL', 'Hotel')
        HOSTEL = ('HOSTEL', 'Hostel')
        AIRBNB = ('AIRBNB', 'Airbnb')
        CAMPING = ('CAMPING', 'Camping')
    destination = models.TextField()
    transporation = models.TextField(choices = Transporation.choices)
    stay = models.TextField(choices = Stay.choices)