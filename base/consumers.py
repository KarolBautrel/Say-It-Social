import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from . models import Message, User, Room
from .views import RoomRetrieveView





class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.room_group_name = 'test'

        async_to_sync(self.channel_layer.group_add)(
          self.room_group_name,
          self.channel_name
        )
        messages = Message.objects.filter(room=26)
        data_ready_for_json =list( messages.values('room','body','user','id'))
        self.accept()
        self.send(text_data=json.dumps({
        'message': data_ready_for_json

      }))

    def receive(self, text_data):
      text_data_json = json.loads(text_data)
      message = text_data_json['message']
      room = text_data_json['room']
      user = text_data_json['user']

      async_to_sync(self.channel_layer.group_send)(
        self.room_group_name,
        {
          'type':'chat_message',
          'message':message,
          'room': room,
          'user':user
        }
      )

    def create_message(self, message, room, user):

      new_message = Message(
        body = message,
        room = Room.objects.get(id = room),
        user = User.objects.get(id = user)

      )

    def chat_message(self, event):
      message = event['message']
      room = event['room']
      user = event['user']
      self.create_message(message, room, user)
      self.send(text_data=json.dumps({
        'type':'chat',
        'message':message,
        'room':room,
        'user':user
      }))




























'''import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message, User
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
      messages = Message.last_15_messages()
      content = {
        'messages': self.messages_to_json(messages)
      }
      self.send_chat_message(content)


    def new_message(self, data):
       user = data['from']
       user_author =User.objects.filter(username = user)[0]
       message = Message.objects.create(user = user_author, body =data['message'] )
       content = {
         'command':'new_message',
         'message': self.message_to_json(message)
       }
       return self.send_chat_message(content)

    def messages_to_json(self, messages):
      result = []
      for message in messages:
        result.append(self.messages_to_json(message))
      return result


    def message_to_json(self,message):
      return{
        'user': message.user.username,
        'body':message.body,
        'created': str( message.created)
      }

    commands = {
      'fetch_messages': fetch_messages,
      'new_message': new_message
    }


    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['id']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))


    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        ( self.send(text_data=json.dumps(message)))'''