from django.shortcuts import render
from base.serializers import (
                         UpdateUserInfoSerializer,
                         UserListSerializer,
                         RoomSerializer,
                         RoomCreateSerializer,
                         RoomUpdateSerializer)

from rest_framework import generics
from .models import User, Room
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser



class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = UserListSerializer


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserInfoSerializer


class RoomCreateView(generics.CreateAPIView):
    queryset = Room.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = RoomCreateSerializer

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomRetrieveView(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomUpdateView(generics.RetrieveUpdateAPIView):
    queryset= Room.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = RoomUpdateSerializer