import os
from celery import Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE','helpdesk_project.settings')
app=Celery('helpdesk_project')
app.config_from_object('django.conf:settings',namespace='CELERY')
app.autodiscover_tasks()
