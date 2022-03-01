from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from .models import User

class CreateUserTestCase(TestCase):


    def test_create_user_with_email_succesfull(self):
        url = reverse('create-user')
        response = self.client.post(url, {
                                        'username':'Testusername', 
                                        'name':'Test name',
                                        'email':'test@example.com',
                                        'bio':'Test bio',
                                        'password1':'test password',
                                        'password2':'test password'})
        user = User.objects.last()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(user.username, 'Testusername')

    def test_create_user_wrong_passwords_failed(self):
        url = reverse('create-user')
        response = self.client.post(url, {
                                        'username':'Testusername', 
                                        'name':'Test name',
                                        'email':'test@example.com',
                                        'bio':'Test bio',
                                        'password1':'test passwo22rd',
                                        'password2':'test password'})
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
        