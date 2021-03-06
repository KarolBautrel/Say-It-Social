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
        fields = ['id', 'username', 'name', 'email', 'bio']


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'bio']

   
class UpdateUserInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['bio']


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


class UserProfilePageSerializer(ModelSerializer):
    rooms = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'bio', 'rooms']

    def get_rooms(self, obj):
        return  RoomSerializer(obj.room_set.all(), many = True).data

class TopicSerializer(ModelSerializer):
    rooms = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = ['id', 'topic', 'rooms']

    def get_rooms(self, obj):
        return  RoomSerializer(obj.room_set.all(), many = True).data


class EmailChangeSerializer(ModelSerializer):

    re_email = serializers.EmailField()

    class Meta:
        model = User
        fields = ['email', 're_email']

    def validate(self, data):
        if data['email'] == data['re_email']:
            return data
        else:
            raise serializers.ValidationError('Emails needs to be the same')