from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Ticket(models.Model):
    PRIORITY_CHOICES = (
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    )

    STATUS_CHOICES = (
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
        ('CLOSED', 'Closed'),
        ('ESCALATED', 'Escalated'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()

    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='LOW'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='OPEN'
    )

    created_by = models.ForeignKey(
        User,
        related_name='tickets_created',
        on_delete=models.CASCADE
    )

    assigned_to = models.ForeignKey(
        User,
        related_name='tickets_assigned',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class TicketComment(models.Model):
    ticket = models.ForeignKey(
        Ticket,
        related_name='comments',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user}"
