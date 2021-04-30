from django.db import models
from travel_buddies.accounts.models import UserProfile
from travel_buddies.travel.models import Trip

# Create your models here.
class Suggestions(models.Model):
    user = models.ForeignKey(UserProfile, related_name='suggestions', on_delete=models.CASCADE)
    trip_plan = models.ForeignKey(Trip, on_delete=models.CASCADE)
    start_date = models.DateTimeField(null = False, blank = False)
    end_date = models.DateTimeField(null = False, blank = False)
    vote = models.IntegerField(null = False, blank = False, default = 0)
