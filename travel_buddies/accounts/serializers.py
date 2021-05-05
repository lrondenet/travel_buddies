from django.contrib.auth.models import User, Permission
from rest_framework import serializers
from travel_buddies.accounts.models import UserProfile
from travel_buddies.suggestions.models import Suggestions
from travel_buddies.travel.models import Trip


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    user_permissions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    groups = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    def validate_username(self, value):
        user = self.context['request'].user 
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({"username": "This username is already in use."})
        return value

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    suggestions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    trips = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile
     
    def update(self, instance, validated_data):
        instance.address1 = validated_data.get('address1', instance.address1)
        instance.address2 = validated_data.get('address2', instance.address2)
        instance.zipcode = validated_data.get('zipcode', instance.zipcode)
        instance.city = validated_data.get('city', instance.city)
        instance.country = validated_data.get('country', instance.country)
        instance.phone = validated_data.get('phone', instance.phone)
        
        user_data = validated_data.pop('user')
        user = instance.user
        user.username = user_data.get('username', user.username)
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.save()
        instance.save()
        return instance

    class Meta:
        model = UserProfile
        fields = ['user_id', 'address1', 'address2', 'zipcode', 'city', 'country', 'phone','suggestions','trips', 'user']
        read_only_fields = ['trips', 'suggestions']




        