from rest_framework import serializers
from .models import Ticket, TicketComment
from accounts.models import User


# ---------------- COMMENTS ----------------
class TicketCommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TicketComment
        fields = ["id", "user", "message", "created_at"]


# ---------------- USER CREATE TICKET ----------------
class UserTicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["id", "title", "description", "priority"]


# ---------------- AGENT UPDATE STATUS ----------------
class AgentTicketUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["status"]


# ---------------- ADMIN ASSIGN AGENT ----------------
class AdminAssignTicketSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role="AGENT")
    )

    class Meta:
        model = Ticket
        fields = ["assigned_to"]


# ---------------- FULL TICKET (ADMIN / AGENT VIEW) ----------------
class TicketSerializer(serializers.ModelSerializer):
    comments = TicketCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = "__all__"
