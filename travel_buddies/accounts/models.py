from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key = True, on_delete=models.CASCADE)
    address1 = models.TextField("Address 1", null=True, blank=True)
    address2 = models.TextField("Address 2", null=True, blank=True)
    zipcode  = models.IntegerField("Zipcode", null=True, blank=True)
    city = models.TextField("City", null=True, blank=True)
    country = models.TextField("Country", null=True, blank=True)
    phone = models.TextField("Phone", null=True, blank=True)

    def __str__(self):
        return str(self.user_id)
        
