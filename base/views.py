from django.http import HttpResponse
from django.shortcuts import render
from base.serializers import (
    UpdateUserInfoSerializer,
    UserListSerializer,
    EmailChangeSerializer,
    TopicSerializer,
    RoomSerializer,
    RoomCreateSerializer,
    RoomUpdateSerializer,
    UserDetailSerializer,
    UserProfilePageSerializer,
    MessageCreateSerializer,
    MessageUpdateSerializer,
    MessagesSerializer,
    FriendRequestSerializer
    )

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import FriendRequest, User, Room, Message, Topic
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from base.permissions import HostEditAllow, RequestUserAllowed, MessageCreatorAllow
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = UserListSerializer


class UserRetrieveView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserProfilePageSerializer

class UserChangeEmailView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (RequestUserAllowed,)
    serializer_class = EmailChangeSerializer


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (RequestUserAllowed, )
    serializer_class = UpdateUserInfoSerializer


class TopicView(generics.ListAPIView):
    queryset = Topic.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = TopicSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['topic']


class RoomCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = RoomCreateSerializer

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)


class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RoomSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['topic']
    search_fields = ['name']


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

    def get(self,*args,**kwargs):
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

class RetrieveFriendRequestView(APIView):

    permission_classes = (IsAuthenticated,)
    def get(self,*args,**kwargs):
        queryset = FriendRequest.objects.filter(to_user=self.request.user)
        serializer_class = FriendRequestSerializer(queryset, many=True)
        return Response(serializer_class.data)

class SendFriendRequestView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,*args,**kwargs):
        from_user = self.request.user
        to_user = User.objects.get(id=self.kwargs['pk'])
        friend_request, created = FriendRequest.objects.get_or_create(from_user = from_user, to_user = to_user)
        if created:
            return HttpResponse('Friend request sent')
        else:
            return HttpResponse('Friend request was already sent')

class AcceptFriendRequestView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,*args,**kwargs):
        friend_request = FriendRequest.objects.get(id = self.kwargs['pk'])
        if friend_request.to_user == self.request.user:
            friend_request.to_user.friends.add(friend_request.from_user)
            friend_request.from_user.friends.add(friend_request.to_user)
            friend_request.delete()
            return HttpResponse('Friend request accpeted')
        else:
            return HttpResponse('Friend request rejected')

class RejectFriendRequestView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,*args,**kwargs):
        friend_request = FriendRequest.objects.get(id = self.kwargs['pk'])
        if friend_request.to_user == self.request.user:
            friend_request.delete()
            return HttpResponse('Friend request rejected')

class DeleteUserFromFriendsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,*args,**kwargs):
        friend = User.objects.get(id = self.kwargs['pk'])
        if friend in self.request.user.friends.all():
            self.request.user.friends.remove(friend)
            friend.friends.remove(self.request.user)
            return HttpResponse ('Friend deleted from friend list')
        else:
            return HttpResponse ('No friend with this name in your friend list')
