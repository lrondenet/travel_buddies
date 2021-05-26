from rest_framework import serializers
from .models import Suggestions, Vote


class VoteSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user_id')

    class Meta:
        model = Vote
        fields = ['user', 'suggestions', 'created_at', 'id']


class SuggestionsSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user_id')
    vote = VoteSerializer(many=True, read_only=True)

    def validate(self, data):
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError("end_date must be greater than start_date")
        return data


    class Meta:
        model = Suggestions
        fields = ['id','user', 'trip_plan', 'start_date', 'end_date', 'vote']


