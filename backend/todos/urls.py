from django.conf.urls import url
from django.urls import path
from .views import ListTodo, DetailTodo
# Adds on 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('<int:pk>/', DetailTodo.as_view()),
    path('', ListTodo.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)