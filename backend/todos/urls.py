from django.conf.urls import url
from django.urls import path
from rest_framework import views

#from .views import ListTodo, DetailTodo, todo_list
from .views import UserList, TodoList

# Adds on 


urlpatterns = [

    #path('<int:pk>/', DetailTodo.as_view()),
    #path('', ListTodo.as_view()),  
    

    #We are exporting the urls - app

    path('users/', UserList.as_view()),
    path('users/todos/<int:pk>/', TodoList.as_view()),
    
    
    #path('todos/<int:pk>/', todo_list),

] 

# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)