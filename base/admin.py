from django.contrib import admin
from .models import User, Room, Topic


admin.site.register(User)
admin.site.register(Room)
admin.site.register(Topic)