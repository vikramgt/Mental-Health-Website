from .forms import BullyingReportForm
from django.shortcuts import render, HttpResponse, redirect
from .models import user_id
from django.contrib.auth import login, logout
from django.contrib import messages
from .forms import CRUDFORM
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
# from myapp.backends import EmailBackend
from .authentication import EmailBackend

import pdb
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FAQ
import tensorflow as tf
# from tensorflow import keras
import joblib
import pandas as pd
import numpy as np

# Adjust the path accordingly
loaded_model = joblib.load('gbc_model.joblib')


def HomePage(request):
    return render(request, 'home.html')


def foucsmode(request):
    return render(request, 'focusMode.html')


def SignIn(request):
    print(request.method)
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(email, password)
        user = EmailBackend().authenticate(request=request, email=email, password=password,
                                           model=user_id, backend='myapp.backends.EmailBackend')
        print("user is ", user)
        if user:
            request.session['user'] = str(user).upper()
            return redirect('home')
        else:
            messages.error(request, 'Invalid credentials. Please try again.')
            return render(request, 'signin.html')
    return render(request, 'signin.html')


def TakeTest(request):
    return render(request, 'taketest.html')


def SignUp(request):
    form = CRUDFORM(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            return redirect('taketest')
    context = {
        "form": form
    }
    return render(request, 'signup.html', context)


def Logout(request):
    logout(request)
    request.session.flush()
    return redirect('home')
# Create your views here.


def MyApi(request):
    return render(request, 'my-api-endpoint.html')


def MentalHealth(request):
    faqs = FAQ.objects.all()
    return render(request, 'MentalHealth.html', {'faqs': faqs})


class QuizResponseView(APIView):
    def post(self, request):
        feature_names = ['Age', 'Gender', 'self_employed', 'family_history',
                         'work_interfere', 'no_employees', 'remote_work', 'tech_company',
                         'benefits', 'care_options', 'wellness_program', 'seek_help',
                         'anonymity', 'leave', 'mental_health_consequence',
                         'phys_health_consequence', 'coworkers', 'supervisor',
                         'mental_health_interview', 'phys_health_interview',
                         'mental_vs_physical', 'obs_consequence']
        query_dict = request.data
        values = query_dict.getlist('my_array[]')

        data_dict = {feature_name: [
            int(value)] for feature_name, value in zip(feature_names, values)}
        # data_array = np.array(list(data_dict.values()))
        df = pd.DataFrame(data_dict)
        pred = loaded_model.predict(df)
        return Response({'predictions': 'You Require Mental Care' if pred.tolist()[0] == 1 else 'You do not require any special Mental Care'}, status=status.HTTP_200_OK)


def report_bullying(request):
    if request.method == 'POST':
        form = BullyingReportForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('thank_you')
    else:
        form = BullyingReportForm()

    return render(request, 'report_bullying.html', {'form': form})


def thank_you(request):
    return render(request, 'thank_you.html')
