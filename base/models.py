from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
GENDER = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Different', 'Different')
)


class User (AbstractUser):
    name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(
        max_length=30, null=True, blank=True, unique=True)
    bio = models.TextField(max_length=255, null=True)
    gender = models.CharField(
        max_length=20, choices=GENDER, null=True, default='Different')
    created = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['name', 'username', 'gender']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.username


class Topic (models.Model):
    topic = models.CharField(max_length=40, null=True, blank=True)

    def __str__(self):
        return self.topic


class Room(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)
    name = models.CharField(blank=True, max_length=30)
    description = models.TextField(blank=True, max_length=255)
    participants = models.ManyToManyField(
        User, related_name='participants', blank=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(
        Room, related_name='messages', on_delete=models.CASCADE)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:20]
