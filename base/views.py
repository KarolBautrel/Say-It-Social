from django.shortcuts import render
from base.serializers import CreateUserSerializer, UpdateUserInfoSerializer
from rest_framework import generics
from .models import User
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CreateUserSerializer

class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserInfoSerializer