from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from .models import Ticket
from django.conf import settings

@shared_task
def escalate_tickets():
    now=timezone.now()
    rules={
        'HIGH':timedelta(hours=1),
        'MEDIUM':timedelta(hours=4),
        'LOW':timedelta(hours=24),
    }
    for priority,delta in rules.items():
        expired_time = now - delta
        tickets = Ticket.objects.filter(
            priority=priority,
            status__in=['OPEN', 'IN_PROGRESS'],
            updated_at__lte=expired_time
        )
        for ticket in tickets:
            ticket.status ='ESCALATED'
            ticket.save()
            send_mail(
                subject='Ticket Escalated',
                message=f'Ticket "{ticket.title}" has been escalated.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[
                    ticket.created_by.email,
                ],
                fail_silently=True,
            )
