from django.shortcuts import render
from base.serializers import UpdateUserInfoSerializer
from rest_framework import generics
from .models import User
from rest_framework.permissions import AllowAny, IsAuthenticated



class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserInfoSerializer