from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.shortcuts import render
from .models import User

class CreateUserTestCase(TestCase):


    def test_create_user_with_email_succesfull(self):
        url = render('user-create')
        response = self.client.post(url, {
                                        'username':'Testusername', 
                                        'name':'Test name',
                                        'email':'test@example.com',
                                        'gender':'Female',
                                        'password':'test password',
                                        're_password':'test password'})
        user = User.objects.last()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(user.username, 'Testusername')

    def test_create_user_wrong_passwords_failed(self):
        url = reverse('user-create')
        response = self.client.post(url, {
                                        'username':'Testusername', 
                                        'name':'Test name',
                                        'email':'test@example.com',
                                        'password':'test password',
                                        're_password':'test passsdsdsdword'})
        user = User.objects.last()
        self.assertEqual(response.status_code, 400)

    #TODO    
    """def test_update_user_bio(self):
        user = get_user_model().objects.create(
            email = 'email@gmamg.com',
            password = 'test21',
            name = 'tes ffasf',
        )
        self.client.force_login(user)
        url = reverse('update-user', kwargs = {'pk': user.id})
        print(url)
        response = self.client.put(url,{'bio':'updated Bio'})
        print(response.data)"""
        