from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    ROLE_CHOICES=(
        ('USER','User'),
        ('AGENT','Agent'),
        ('ADMIN','Admin')
    )
    role=models.CharField(max_length=10,choices=ROLE_CHOICES,default='USER')
    def __str__(self):
        return f"{self.username} ({self.role})"
    