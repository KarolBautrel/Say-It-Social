from django.shortcuts import render
from base.serializers import (
    UpdateUserInfoSerializer,
    UserListSerializer,
    TopicSerializer,
    RoomSerializer,
    RoomCreateSerializer,
    RoomUpdateSerializer,
    UserDetailSerializer,
    MessageCreateSerializer,
    MessageUpdateSerializer,
    MessagesSerializer)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import User, Room, Message, Topic
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from base.permissions import HostEditAllow, RequestUserAllowed, MessageCreatorAllow
from django_filters.rest_framework import DjangoFilterBackend


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = UserListSerializer


class UserRetrieveView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (RequestUserAllowed,)
    serializer_class = UserDetailSerializer


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (RequestUserAllowed,)
    serializer_class = UpdateUserInfoSerializer


class TopicView(generics.ListAPIView):
    queryset = Topic.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = TopicSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['topic']


class RoomCreateView(generics.CreateAPIView):
    queryset = Room.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = RoomCreateSerializer

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)


class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RoomSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['topic']


class RoomRetrieveView(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RoomSerializer


class RoomUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Room.objects.all()
    permission_classes = (HostEditAllow,)
    serializer_class = RoomUpdateSerializer


class RoomTopicView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, *args, **kwargs):
        queryset = Room.objects.filter(topic=self.kwargs['topic'])
        serializer_class = RoomSerializer(queryset, many=True)
        return Response(serializer_class.data)


class MessageCreateView(generics.CreateAPIView):
    queryset = Message.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = MessageCreateSerializer

    def perform_create(self, serializer):
        room = serializer.validated_data['room']
        room.participants.add(self.request.user)
        serializer.save(user=self.request.user)


class MessageUpdateView(generics.UpdateAPIView):
    queryset = Message.objects.all()
    permission_classes = (MessageCreatorAllow,)
    serializer_class = MessageUpdateSerializer


class MessageDeleteView(generics.DestroyAPIView):
    queryset = Message.objects.all()
    permission_classes = (MessageCreatorAllow,)


class MessageListView(generics.ListAPIView):
    queryset = Message.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = MessagesSerializer
