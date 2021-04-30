from rest_framework import serializers
from .models import Suggestions

class SuggestionsSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user_id')

    def validate(self, data):
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("end_date must be greater than start_date")
        if data['vote'] < 0:
            raise serializers.ValidationError("vote must be a positive number")
        return data

    # Todo
    # make start_date not putable or always equal

    class Meta:
        model = Suggestions
        fields = ['user', 'trip_plan', 'start_date', 'end_date', 'vote']

    