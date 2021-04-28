from rest_framework import serializers
from .models import Suggestions

class SuggestionsSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user_id')

    class Meta:
        model = Suggestions
        fields = ['user', 'trip_plan', 'start_date', 'end_date', 'vote']

