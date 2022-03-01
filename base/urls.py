
from django.contrib import admin
from django.urls import path,include
from .views import UserUpdateView
from djoser.views import UserViewSet

urlpatterns = [
    
    path('update_user/<int:pk>', UserUpdateView.as_view(),name='update-user'),
    
]
