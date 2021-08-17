#from django.db import models
from djongo import models
from django.utils.timezone import now


# Create your models here.

class Todo(models.Model):    
    task_title = models.CharField(max_length=200)
    priority = models.CharField(max_length=20)
    body_desc = models.TextField()
    task_completed = models.BooleanField()      

    def __str__(self):
        return self.task_title
    
    class Meta:
        abstract = True
     

class User(models.Model):
    user_name = models.CharField(max_length=100)
    join_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.use_name

    class Meta:
        abstract = True

class UserTodo(models.Model):
    user = models.EmbeddedField(
        model_container = User,
    )

    allTasks = models.ArrayField(
        model_container = Todo,
    )