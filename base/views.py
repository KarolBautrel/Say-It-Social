from django.shortcuts import render
from base.serializers import (
    UpdateUserInfoSerializer,
    UserListSerializer,
    RoomSerializer,
    RoomCreateSerializer,
    RoomUpdateSerializer,
    UserDetailSerializer,
    MessageCreateSerializer,
    MessageUpdateSerializer)

from rest_framework import generics
from .models import User, Room, Message
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from base.permissions import HostEditAllow, RequestUserAllowed, MessageCreatorEditAllow


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = UserListSerializer


class UserRetrieveView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserDetailSerializer


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (RequestUserAllowed,)
    serializer_class = UpdateUserInfoSerializer


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


class RoomRetrieveView(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RoomSerializer


class RoomUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Room.objects.all()
    permission_classes = (HostEditAllow,)
    serializer_class = RoomUpdateSerializer


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
    permission_classes = (MessageCreatorEditAllow,)
    serializer_class = MessageUpdateSerializer
