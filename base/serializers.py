from rest_framework.serializers import ModelSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from base.models import User

class CreateUserSerializer(ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username','name','email','password1','password2','bio','avatar']

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({'password1':'Passwords didnt match'})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data['name'],
            bio=validated_data['bio']
        )
        user.set_password(validated_data['password1'])
        user.save()
        return user


class UpdateUserInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['bio', 'avatar']

    