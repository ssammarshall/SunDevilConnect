from django.conf import settings
from django.db import models
from django.db.models import Q, F
from django.contrib.auth.models import AbstractUser

class User(AbstractUser): # Student
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Membership(models.Model):
    MEMBER = 'M'
    LEADER = 'L'
    REQUESTED_JOIN = 'R'
    ROLE_CHOICES = [
        (MEMBER, 'Member'),
        (LEADER, 'Leader'),
        (REQUESTED_JOIN, 'Requested to Join')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='memberships')
    club = models.ForeignKey('Club', on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=REQUESTED_JOIN)
    joined_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} in {self.club} as {self.get_role_display()}"
    
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


class ClubContent(models.Model):
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    is_flagged = models.BooleanField(default=False)
    club = models.ForeignKey('Club', on_delete=models.CASCADE)


class Event(models.Model):
    CATEGORY_CHOICES = [
        ("SPORTS", "Sports"),
        ("ACADEMIC", "Academic"),
        ("SOCIAL", "Social"),
        ("FUNDRAISING", "Fundraising"),
        ("NETWORKING", "Networking"),
    ]

    name = models.CharField(max_length=255, unique=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    is_paid_event = models.BooleanField()
    attendees = models.PositiveIntegerField(default=0)
    max_num_of_attendees = models.PositiveIntegerField()
    club = models.ForeignKey('Club', on_delete=models.CASCADE)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="SOCIAL"
    )

    def __str__(self):
        return self.name
    
    class Meta:
        constraints = [
            models.CheckConstraint(
                name='attendees_lte_max_num_of_attendees',
                check=Q(attendees__lte=F('max_num_of_attendees'))
            )
        ]


class EventRegistration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ("user", "event")
