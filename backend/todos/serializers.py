from django.utils.functional import empty
from rest_framework import serializers
from .models import Todo, User 

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','user','task_title', 'priority', 'body_desc', 'task_completed']
        
        
class UserSerializer(serializers.ModelSerializer):
    tasks = TodoSerializer(required=False, many=True)    
    #user_todos = TodoSerializer(required=False) #We do not added the many attribute
    class Meta:
        model = User
        fields = ['id','user_name','join_date','tasks']
        
        
        #['user_name', 'join_date']


"""
class UserTodoSerializer(serializers.Serializer):
    user = UserSerializer(required=False)
    allTasks = serializers.SerializerMethodField()
    #TodoSerializer(required=False, many=True)
    
    class Meta:  
        model = UserTodo
        fields = ['id', 'user', 'allTasks']
        


    def get_allTasks(self, obj):
        return_data = None
        if type(obj.allTasks) == list:
            embendlist = []
            for item in obj.allTasks:
                embendlist = item.__dict__
                for key in list(embendlist.keys()):
                    if key.startswith('_'):
                        embendlist.pop(key)
                embendlist.append(embendlist)
            return_data = embendlist
        else:
            embendDict= obj.embedded_field
            for key in list(embendDict.keys()):
                if key.startswith('_'):
                    embendDict.pop(key)
            return_data = embendDict
        return return_data

"""


    
        
        


     
