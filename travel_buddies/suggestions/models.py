from django.db import models
from travel_buddies.accounts.models import UserProfile
from travel_buddies.travel.models import Trip

# Create your models here.
class Suggestions(models.Model):
    user = models.ForeignKey(UserProfile, related_name='suggestions', on_delete=models.CASCADE)
    trip_plan = models.ForeignKey(Trip, on_delete=models.CASCADE)
    start_date = models.DateTimeField(null = False, blank = False)
    end_date = models.DateTimeField(null = False, blank = False)


class Vote(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    suggestions = models.ForeignKey(Suggestions, related_name='vote', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['suggestions_id', 'user_id'], name='unique_suggestions_id_user_id')
        ]