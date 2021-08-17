from django.http import request
from rest_framework import generics, serializers
from rest_framework.views import APIView
from .models import Todo
from .models import UserTodo, User
# adds on
from rest_framework.decorators import api_view
from rest_framework import  status
from rest_framework.response import Response 

from .serializers import TodoSerializer, UserSerializer, UserTaskSerializer 
#from todos.serializers import TodoSerializer
 
# Create your views here.
""""
class ListTodo(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DetailTodo(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer   
"""

#Somethings got messed up 

class UserList(APIView):
    """
    This one will list our users, or create new ones  
    """
    def get(self, request, format=None):
        user = UserTodo.objects.all()
        print(f"User datil: {user}")
        serializer = UserTaskSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, format=None):
        requestCopy = request.data
        userOnly = requestCopy.pop('user')
        print(f"User massa: {userOnly} and its type {type(userOnly)}")
        sometasks = requestCopy.pop('allTasks')
        serializer = UserSerializer(data=userOnly)
        #UserTodo.objects.create(user=userOnly, allTasks=sometasks)
        if serializer.is_valid():
            print(f"All here: ... {request.data}")
            
            print(f"Only user: ... {userOnly}")
            UserTodo.objects.create(user=userOnly, allTasks=sometasks)
            #serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
"""

@api_view(['GET','POST','PUT'])
def todo_list(request):
    if request.method == 'GET':
        todos = UserTodo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        sometasks = request.data.pop('allTasks')
        serializer = UserTaskSerializer(data=request.data)
        if serializer.is_valid():
            print(f"All here: ... {request.data}")
            userOnly = request.data.pop('user')
            print(f"Only user: ... {userOnly}")
            UserTodo.objects.create(user=userOnly, allTasks=sometasks)
            #serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        pk = 1
        todo = UserTodo.objects.get(id=pk)
        serializer = TodoSerializer(todo, data=request.data)        
        if serializer.is_valid():   
            serializer.save()            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)

"""
# Adding the custom methods for CRUD
