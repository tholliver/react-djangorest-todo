from django.db import models
from django.utils.timezone import now

# Create your models here.

 
class User(models.Model):    
    user_name = models.CharField(max_length=100)
    join_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.user_name


class Todo(models.Model):  
    user = models.ForeignKey(User, related_name='tasks', blank = True, on_delete=models.CASCADE)
    task_title = models.CharField(max_length=200)
    priority = models.CharField(max_length=20, default='A')
    body_desc = models.TextField(default='No description')
    task_completed = models.BooleanField(default=False)  

    def __str__(self):
        return f"{self.task_title}, {self.priority} "

"""
class UserTodo(models.Model):
    id = models.CharField(
        primary_key=True, max_length=65, default="", blank=False, null=False)
    user = models.EmbeddedField(
        model_container = User
    )

    allTasks = models.ArrayField(
        model_container = Todo,
    
    )
    
    objects = models.DjongoManager()
"""

    