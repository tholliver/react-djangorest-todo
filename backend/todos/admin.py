from django.contrib import admin
from .models import Todo, User
# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_name','join_date']
@admin.register(Todo)
class UserAdmin(admin.ModelAdmin):
    list_display = ['task_title','priority','body_desc','task_completed']

"""
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_name','join_date']
@admin.register(Todo)
class UserAdmin(admin.ModelAdmin):
    list_display = ['task_title','priority','body_desc','task_completed'] 
"""

    