from django.urls import path
from .views import (
    RegisterView,
    CustomLoginView,
    MeView,
    LogoutView,
    UserListView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", CustomLoginView.as_view()),
    path("me/", MeView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("users/", UserListView.as_view()),  # ✅ THIS FIXES 404
]
