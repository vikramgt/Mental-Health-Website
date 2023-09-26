# myapp/urls.py

from django.urls import path, include
from .views import QuizResponseView
from django.contrib import admin


urlpatterns = [
    path('my-api-endpoint/', QuizResponseView.as_view(), name='my_api_endpoint'),
    path('bullying/', include('bullyingapp.urls')),

    
]
