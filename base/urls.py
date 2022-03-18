
from django.contrib import admin
from django.urls import path, include
from .views import (
    UserUpdateView,
    UserListView,
    UserChangeEmailView,
    TopicView,
    RoomCreateView,
    RoomListView,
    RoomTopicView,
    RoomRetrieveView,
    RoomUpdateView,
    UserRetrieveView,
    MessageCreateView,
    MessageUpdateView,
    MessageDeleteView,
    MessageListView
)

urlpatterns = [

    path('', UserListView.as_view(), name='users'),
    path('topics', TopicView.as_view(), name='topics'),
    path('user/<int:pk>', UserRetrieveView.as_view(), name='user'),
    path('update_user/<int:pk>', UserUpdateView.as_view(), name='update-user'),
    path('user/change_email/<int:pk>', UserChangeEmailView.as_view(), name='change-email'),
    path('create_room', RoomCreateView.as_view(), name='create-room'),
    path('rooms', RoomListView.as_view(), name='rooms'),
    path('rooms/topic/<topic>', RoomTopicView.as_view(), name="Room-topic"),
    path('room/<int:pk>', RoomRetrieveView.as_view(), name='detail_room'),
    path('room/update/<int:pk>', RoomUpdateView.as_view(), name='update-room'),
    path('messages', MessageListView.as_view(), name='messages'),
    path('create_message', MessageCreateView.as_view(), name='message'),
    path('update_message/<int:pk>',
         MessageUpdateView.as_view(), name='update-message'),
    path('delete_message/<int:pk>',
         MessageDeleteView.as_view(), name='delete-message')

]
