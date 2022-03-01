
from django.contrib import admin
from django.urls import path,include
from .views import UserRegistrationView, UserUpdateView

urlpatterns = [
    path('/create_user', UserRegistrationView.as_view(), name='create-user'),
    path('/update_user/<int:pk>', UserUpdateView.as_view(),name='update-user')
]
