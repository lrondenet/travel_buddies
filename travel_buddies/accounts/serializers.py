from django.contrib.auth.models import User, Permission
from rest_framework import serializers
from travel_buddies.accounts.models import UserProfile
from travel_buddies.suggestions.models import Suggestions
from travel_buddies.travel.models import Trip


class UserSerializer(serializers.ModelSerializer):
    user_permissions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    groups = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    # def update(self, instance, validated_data):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'user_permissions', 'groups', 'password']
        read_only_fields = ['last_login', 'is_superuser', 'user_permissions', 'groups', 'is_staff', 'is_active', 'username']
        extra_kwargs = {'password': {'write_only': True}}


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    suggestions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    trips = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    # Todo;
    # Put create function into view 
    # rename to perform_create(self, serializer)
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        print(validated_data)
        suggestions_data = validated_data.pop('suggestions')
        trips_data = validated_data.pop('trips')
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile
    
    def update(self, instance, validated_data):
        instance.address1 = validated_data.get('address1', instance.address1)
        instance.address2 = validated_data.get('address2', instance.address2)
        instance.zipcode = validated_data.get('zipcode', instance.zipcode)
        instance.city = validated_data.get('city', instance.city)
        instance.country = validated_data.get('country', instance.country)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()

        user_data = validated_data.pop('user')
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.save()
        return instance

    class Meta:
        model = UserProfile
        fields = ['user_id', 'address1', 'address2', 'zipcode', 'city', 'country', 'phone','suggestions','trips', 'user']
        read_only_fields = ['trips', 'suggestions']

