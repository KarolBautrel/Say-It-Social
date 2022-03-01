from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.shortcuts import render
from .models import User, Topic, Room
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

class RoomManagementTestCase(TestCase):
    def setUp(self):
        self.topic = Topic.objects.create(topic = 'test')
        User.objects.create(username='lauren',email='lauren@lauren.com',password = 'secret')

    def test_authorized_user_can_create_room(self):
        user = User.objects.get(username='lauren')
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse('create-room')
        response = client.post(url, 
                        {'name':'Test Name',
                        'description':'Test Description',
                        'topic': self.topic.id,
                        'host':client
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Room.objects.last().name, 'Test Name')


    def test_unauthorized_user_cant_create_room(self):
        client = APIClient()
        url = reverse('create-room')
        response = client.post(url, 
                        {'name':'Test Name',
                        'description':'Test Description',
                        'topic': self.topic.id,
                        'host':client
        })
        self.assertEqual(response.status_code, 401)