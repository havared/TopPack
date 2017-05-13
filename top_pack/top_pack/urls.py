import apis
import views

from django.conf.urls import url
from django.contrib import admin

urlpatterns = [
    url(r'search/', apis.GithubRepoSearch.as_view()),
    url(r'get-package-json/', apis.GetPackageJson.as_view()),
    url(r'home', views.home),
    url(r'top-packages', views.top_packages),
]
