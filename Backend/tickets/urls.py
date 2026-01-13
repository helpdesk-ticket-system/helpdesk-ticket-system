from django.urls import path
from .views import (
    UserTicketListCreateView,
    AgentTicketListView,
    AgentTicketUpdateView,
    AdminTicketListView,
    AdminAssignTicketView,
    AdminDeleteTicketView,
    TicketCommentView,
    TicketReportView,
)

urlpatterns = [
    path("", UserTicketListCreateView.as_view()),
    path("agent/", AgentTicketListView.as_view()),
    path("agent/<int:pk>/update/", AgentTicketUpdateView.as_view()),
    path("admin-tickets/", AdminTicketListView.as_view()),
    path("admin-tickets/<int:pk>/assign/", AdminAssignTicketView.as_view()),
    path("admin-tickets/<int:pk>/delete/", AdminDeleteTicketView.as_view()),
    path("<int:pk>/comments/", TicketCommentView.as_view()),
    path("reports/summary/", TicketReportView.as_view()),
]
