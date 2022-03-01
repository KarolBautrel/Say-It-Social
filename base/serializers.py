from rest_framework.serializers import ModelSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from base.models import User


class UpdateUserInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['bio', 'gender']

    