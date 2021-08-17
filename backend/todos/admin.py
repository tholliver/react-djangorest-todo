from django.contrib import admin
from .models import Todo, User, UserTodo
# Register your models here.


admin.site.register([UserTodo])