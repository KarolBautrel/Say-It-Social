from django.db import models
from django.contrib.auth.models import  User


# Create your models here.


class Profile(models.Model):
    user = models.CharField(User, max_length=200,null=True)
    email= models.EmailField(null=True, unique = True)
    bio = models.TextField(null=True)
    avatar = models.ImageField(null=True, default = 'avatar.svg', blank = True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
