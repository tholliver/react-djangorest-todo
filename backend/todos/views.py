from rest_framework.views import APIView
from .models import Todo, User
from django.db.models import Q
# adds on
from rest_framework import  status
from rest_framework.response import Response 
from .serializers import TodoSerializer, UserSerializer

 
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
    def get(self ,request, format=None):        
        user = User.objects.all()          
        serializer = UserSerializer(user, many=True)       
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, format=None):
        requestCopy = request.data        
        serializer = UserSerializer(data=request.data)
        new_user_name = requestCopy.get('user_name') 
        entries = User.objects.filter(user_name=new_user_name).count()

        if(serializer.is_valid()):
            if entries==0:
                print(f"User new in serial: { serializer.data }")
                userCreted = User.objects.create(user_name=new_user_name)
                print(f"La new user: {userCreted}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"Message":"Username taken"}, status=status.HTTP_409_CONFLICT)   
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#For todos

class TodoList(APIView):
    """
    This one will list our users, or create new ones  
    """
    def get(self, request, pk, format=None):     
        
        foundUser = Todo.objects.filter(user=pk, task_completed__in=[False])        
        #filterRed = foundUser.filter(task_completed=False, user=pk)
        serialized = TodoSerializer(foundUser, many=True)
        return Response(serialized.data , status=status.HTTP_200_OK)
        
    def post(self, request, pk, format=None):
        request_todoCopy = request.data
               
        #Check if username already exists
        
        foundUser = User.objects.filter(id=pk).count() 
          
        if foundUser == 1:
            #We crete a new key for the request
            #It adds the user ID to the Forean Key in the new Todo -> Request
            request_todoCopy['user'] = pk
            serializer = TodoSerializer(data=request_todoCopy) 
            if serializer.is_valid():
                serializer.save()               

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"Message":"Username taken"}, status=status.HTTP_409_CONFLICT) 



        #sometasks = request.data.pop('allTasks')
        print(foundUser)
    

    def put(self, request, pk, format=None):
        LaDict = request.data
        leLIst = list(LaDict.values())
        #print(leLIst)
        foundUser = Todo.objects.filter(id__in=leLIst).update(task_completed=True) 
        
        if foundUser:
            print(f"Found list:{foundUser}")
            return Response({"Succesfully":"Updated list or object"} , status=status.HTTP_200_OK)       
        
        return Response({"Messages":"Error on request"} , status=status.HTTP_400_BAD_REQUEST)

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
