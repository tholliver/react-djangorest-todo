from django.test import TestCase
from .models import Todo
# Create your tests here.


#task_title
#body_desc
class TodoModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Todo.objects.create(task_title = 'Mna M', body_desc = 'le ville')

    def test_tasktitle_content(self):
        # CHECK IF IT CAN  BE FOUND BY ID 
        todo = Todo.objects.get(task_title='Mna M')
        expected_object_name = f'{todo.task_title}'
        self.assertEqual(expected_object_name, 'Mna M')

    def test_bodydesc_content(self):
        todo = Todo.objects.get(body_desc='le ville')
        expected_object_name = f'{todo.body_desc}'
        self.assertEqual(expected_object_name, 'le ville')