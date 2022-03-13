from rest_framework.serializers import ModelSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from base.models import User, Room, Message, Topic


class UserListSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ParticipantSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email']


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'bio']


class UpdateUserInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['bio']


class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'topic']


class MessageCreateSerializer(ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())
    room = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Room.objects.all())

    class Meta:
        model = Message
        fields = ['body', 'room', 'user']

        def create(self, validated_data):
            room = validated_data['room']
            room_qs = Room.objects.get(pk=room.id)
            room_qs.participants.add(self.request.user)


class MessagesSerializer(ModelSerializer):
    user = UserDetailSerializer(many=False)
    room = serializers.StringRelatedField(many=False)

    class Meta:
        model = Message
        fields = ['id', 'user', 'room', 'body', 'created']


class MessageUpdateSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = ['body']


class RoomSerializer(ModelSerializer):
    host = UserDetailSerializer(many=False)
    topic = serializers.ReadOnlyField(source='topic.topic')
    messages = MessagesSerializer(many=True)
    participants = ParticipantSerializer(many=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'description', 'topic',
                  'host', 'participants', 'messages']


class RoomCreateSerializer(ModelSerializer):
    host = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Room
        fields = ['name', 'description', 'topic', 'host']


class RoomUpdateSerializer(ModelSerializer):

    topic = serializers.ReadOnlyField(source='topic.name')

    class Meta:
        model = Room
        fields = ['name', 'description', 'topic']
