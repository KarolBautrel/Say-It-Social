from rest_framework.serializers import ModelSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from base.models import User, Room


class UserListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UpdateUserInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['bio', 'gender']


class RoomCreateSerializer(ModelSerializer):
    host = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Room
        fields = ['name','description','topic', 'host']
        

class RoomSerializer(ModelSerializer):
    host = serializers.ReadOnlyField(source='host.username')
    topic= serializers.ReadOnlyField(source='topic.topic')
    class Meta:
        model = Room
        fields = ['name','description','topic', 'host']


class RoomUpdateSerializer(ModelSerializer):

    topic= serializers.ReadOnlyField(source='topic.name')
    class Meta:
        model = Room
        fields = ['name','description','topic']
