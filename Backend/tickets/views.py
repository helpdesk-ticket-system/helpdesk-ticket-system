from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.utils import timezone
from datetime import timedelta

from .models import Ticket, TicketComment
from .serializers import (
    UserTicketCreateSerializer,
    AgentTicketUpdateSerializer,
    AdminAssignTicketSerializer,
    TicketSerializer,
    TicketCommentSerializer,
)
from .permissions import IsUser, IsAgent, IsAdmin


# ================= USER =================
class UserTicketListCreateView(generics.ListCreateAPIView):
    serializer_class = UserTicketCreateSerializer
    permission_classes = [IsUser]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["status", "priority"]
    search_fields = ["title"]

    def get_queryset(self):
        return Ticket.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, status="OPEN")


# ================= AGENT =================
class AgentTicketListView(generics.ListAPIView):
    serializer_class = TicketSerializer
    permission_classes = [IsAgent]

    def get_queryset(self):
        return Ticket.objects.filter(assigned_to=self.request.user)


class AgentTicketUpdateView(generics.UpdateAPIView):
    serializer_class = AgentTicketUpdateSerializer
    permission_classes = [IsAgent]

    def get_queryset(self):
        return Ticket.objects.filter(assigned_to=self.request.user)


# ================= ADMIN =================
class AdminTicketListView(generics.ListAPIView):
    serializer_class = TicketSerializer
    permission_classes = [IsAdmin]
    queryset = Ticket.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["status", "priority", "assigned_to"]
    search_fields = ["title"]


class AdminAssignTicketView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = AdminAssignTicketSerializer
    permission_classes = [IsAdmin]


class AdminDeleteTicketView(generics.DestroyAPIView):
    queryset = Ticket.objects.all()
    permission_classes = [IsAdmin]


# ================= COMMENTS =================
class TicketCommentView(generics.ListCreateAPIView):
    serializer_class = TicketCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TicketComment.objects.filter(ticket_id=self.kwargs["pk"])

    def perform_create(self, serializer):
        ticket = Ticket.objects.get(pk=self.kwargs["pk"])
        serializer.save(ticket=ticket, user=self.request.user)


# ================= REPORT =================
class TicketReportView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        last_7_days = timezone.now() - timedelta(days=7)

        opened = Ticket.objects.filter(created_at__gte=last_7_days).count()
        resolved = Ticket.objects.filter(
            status="RESOLVED",
            updated_at__gte=last_7_days
        ).count()
        escalated = Ticket.objects.filter(
            status="ESCALATED",
            updated_at__gte=last_7_days
        ).count()

        return Response({
            "last_7_days": {
                "opened": opened,
                "resolved": resolved,
                "escalated": escalated,
            }
        })
