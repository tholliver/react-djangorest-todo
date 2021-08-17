from abc import abstractclassmethod
from django.db.models import fields
from rest_framework import serializers
from .models import Todo, User, UserTodo 

class TodoSerializer(serializers.ModelSerializer):
    model = Todo
    fields = ('id', 'task_title', 'priority', 'body_desc', 'task_completed',)

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = '__all__'
        #['user_name', 'join_date']

class UserTaskSerializer(serializers.Serializer):
    user = UserSerializer()
    allTasks = TodoSerializer(required=False, many=True)
    
    class Meta:  
        model = UserTodo
        fields = '__all__'
        
     
