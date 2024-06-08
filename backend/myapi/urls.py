from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.loginUser, name="loginUser"),
    path("register/", views.registerUser, name="registerUser"),
    path("session/", views.session_view, name="session_view")
]