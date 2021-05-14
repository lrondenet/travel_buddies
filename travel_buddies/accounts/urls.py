from django.urls import path
from travel_buddies.accounts import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('token/', views.CustomAuthToken.as_view())
]