from django.shortcuts import render
from base.serializers import UpdateUserInfoSerializer, UserListSerializer
from rest_framework import generics
from .models import User
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser



class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
    serializer_class = UserListSerializer


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserInfoSerializer

    