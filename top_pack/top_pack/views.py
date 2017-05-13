from django.shortcuts import render
from django.conf import settings
from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def top_packages(request):
    return render(request, 'top-packages.html')