from django.db import models

# Create your models here.

class Todo(models.Model):
    task_title = models.CharField(max_length=200)
    body_desc = models.TextField()

    def __str__(self):
        return self.task_title