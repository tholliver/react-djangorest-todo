from rest_framework.views import APIView
from .models import Todo, User
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
                User.objects.create(user_name=new_user_name)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"Messages":"Username taken"}, status=status.HTTP_409_CONFLICT)   
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#For todos

class TodoList(APIView):
    """
    This one will list our users, or create new ones  
    """
    def get(self, pk, request, format=None):        
        user = Todo.objects.all()      
        
        serialized = Todo(user, many=True)
   
        print(f"The json: { serialized }")
        return Response(serialized , status=status.HTTP_200_OK)
        
    def post(self, pk, request, format=None):
        requestCopy = request.data
        userOnly = requestCopy.pop('user')
        sometasks = requestCopy.pop('allTasks')
        
        serializer = TodoSerializer(data=request.data)
        
        #Check if username already exists
        new_user_name = userOnly.get('user_name') 
        #user_name=userOnly.user_name
        #userExits = User.objects.get(user_name=)      
        print(f"We have: { type(new_user_name) } ")
        #entries = UserTodo.objects.filter(user={'user_name':new_user_name}).count()
        entries = User.objects.filter(user_name=new_user_name).count()
        print(f"List of users: ")
        #sometasks = request.data.pop('allTasks')
        
        if serializer.is_valid() and entries==0:           
            
            User.objects.create(user=userOnly, allTasks=sometasks)

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
