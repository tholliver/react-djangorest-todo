from rest_framework import generics, serializers
from .models import Todo
# adds on
from rest_framework.decorators import api_view
from rest_framework import  status
from rest_framework.response import Response 

from .serializers import TodoSerializer 
#from todos.serializers import TodoSerializer
 
# Create your views here.

class ListTodo(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DetailTodo(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# Adding the custom methods for CRUD

@api_view(['GET','POST','PUT'])
def todo_list(request, pk):
    if request.method == 'GET':
        todos = Todo.objects.all() 
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        todo = Todo.objects.get(id=pk)
        serializer = TodoSerializer(todo, data=request.data)        
        if serializer.is_valid():   
            serializer.save()            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)



