from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key = True, on_delete=models.CASCADE)
    address1 = models.TextField("Address 1", null=True)
    address2 = models.TextField("Address 2", null=True)
    zipcode  = models.IntegerField("Zipcode", null=True)
    city = models.TextField("City", null=True)
    country = models.TextField("Country", null=True)
    phone = models.TextField("Phone", null=True)

    def __str__(self):
        return str(self.user_id)
        
