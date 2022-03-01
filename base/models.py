from django.db import models
from django.contrib.auth.models import  AbstractUser

# Create your models here.
GENDER = (
    ('Male','Male'),
    ('Female','Female'),
    ('Different', 'Different')
)

class User (AbstractUser):
    name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=30,null=True,blank=True, unique=True)
    bio = models.TextField(max_length=255,null=True)
    gender = models.CharField(max_length=20, choices=GENDER, null=True, default='Different')
    created = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['name','username','gender']
    USERNAME_FIELD = 'email'

    def __str__(self):  
        return self.username
