from rest_framework import serializers
from travel_buddies.accounts.models import UserProfile
from travel_buddies.suggestions.models import Suggestions
from travel_buddies.travel.models import Trip

class UserSerializer(serializers.ModelSerializer):
    suggestions = serializers.PrimaryKeyRelatedField(many=True, queryset=Suggestions.objects.all())
    trips = serializers.PrimaryKeyRelatedField(many=True, queryset=Trip.objects.all())

    class Meta:
        model = UserProfile
        fields = ['user_id', 'address1', 'address2', 'zipcode', 'city', 'country', 'phone','suggestions','trips']

