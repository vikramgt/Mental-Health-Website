"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from myapp import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.HomePage, name='home'),
    path('signin/', views.SignIn, name='signin'),
    path('taketest/', views.TakeTest, name='taketest'),
    path('signup/', views.SignUp, name='signup'),
    path('focusMode/', views.foucsmode, name='focusMode'),
    path('logout/', views.Logout, name='logout'),
    path('Mentalhealth/', views.MentalHealth, name='Mentalhealth'),
    # path('my-api-endpoint/', views.MyApi, name='my-api-endpoint'),
    path('report_bullying/', views.report_bullying, name='report_bullying'),
    path('thank_you/', views.thank_you, name='thank_you'),
    path('my-api-endpoint/', views.QuizResponseView.as_view(),
         name='my_api_endpoint'),
]


# static files (images, css, javascript,
