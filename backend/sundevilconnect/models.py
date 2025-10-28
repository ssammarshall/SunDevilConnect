from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser): # Student
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Membership(models.Model):
    MEMBER = 'M'
    LEADER = 'L'
    ROLE_CHOICES = [
        (MEMBER, 'Member'),
        (LEADER, 'Leader')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    club = models.ForeignKey('Club', on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=MEMBER)
    joined_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} in {self.club} as {self.role}"
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'club'], name='unique_user_per_club')
        ]

class Club(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=255)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, through=Membership)

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=255, unique=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    is_paid_event = models.BooleanField()
    attendees = models.PositiveIntegerField()
    max_num_of_attendees = models.PositiveIntegerField()
    club = models.ForeignKey('Club', on_delete=models.CASCADE)

    def __str__(self):
        return self.name