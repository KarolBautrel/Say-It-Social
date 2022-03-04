from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.shortcuts import render
from .models import User, Topic, Room
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


class RoomManagementTestCase(TestCase):
    def setUp(self):
        self.topic = Topic.objects.create(topic='test')
        self.user = User.objects.create(
            username='lauren', email='lauren@lauren.com', password='secret')
        self.user2 = User.objects.create(
            username='olivia', email='olivia@olivia.com', password='secret')

    def test_authorized_user_can_create_room(self):
        '''
        Test that authorized user can create room
        '''
        user = User.objects.get(username='lauren')
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse('create-room')
        response = client.post(url,
                               {'name': 'Test Name',
                                'description': 'Test Description',
                                'topic': self.topic.id,
                                'host': client
                                })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Room.objects.last().name, 'Test Name')

    def test_unauthorized_user_cant_create_room(self):
        '''
        Test that unauthorized user cant create room
        '''
        client = APIClient()
        url = reverse('create-room')
        response = client.post(url,
                               {'name': 'Test Name',
                                'description': 'Test Description',
                                'topic': self.topic.id,
                                'host': client
                                })
        self.assertEqual(response.status_code, 401)

    def test_creator_of_room_able_to_update_room(self):
        '''
        Test that creator of room is able to update it
        '''
        room = Room.objects.create(topic=self.topic,
                                   host=self.user,
                                   name='Test Room'
                                   )
        user = User.objects.get(username='lauren')
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse('update-room', kwargs={'pk': room.id})
        response = client.put(url, {
            'name': 'Updated Name',
            'description': 'Updated Description',
            'topic': self.topic.id,
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Room.objects.last().name, 'Updated Name')

    def test_noncreator_of_room_unable_to_update_room(self):
        '''
        Test that non-creator user is able to update it
        '''
        room = Room.objects.create(topic=self.topic,
                                   host=self.user,
                                   name='Test Room'
                                   )
        user = User.objects.get(username='olivia')
        client = APIClient()
        client.force_authenticate(user=user)
        url = reverse('update-room', kwargs={'pk': room.id})
        response = client.put(url, {
            'name': 'Updated Name',
            'description': 'Updated Description',
            'topic': self.topic.id,
        })
        self.assertEqual(response.status_code, 403)
