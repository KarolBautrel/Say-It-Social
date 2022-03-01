
from django.contrib import admin
from django.urls import path,include
from .views import UserUpdateView,UserListView

urlpatterns = [
    
    path('', UserListView.as_view(), name = 'users'),
    path('update_user/<int:pk>', UserUpdateView.as_view(),name='update-user'),
    
]
