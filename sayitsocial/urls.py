
from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('api/', include('djoser.urls')),
    path('api/', include('djoser.urls.authtoken')),
    path('', TemplateView.as_view(template_name = 'index.html'))
]
