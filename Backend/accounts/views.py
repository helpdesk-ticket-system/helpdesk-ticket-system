from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import RegisterSerializer
from .permissions import IsAdmin   # ✅ IMPORTANT


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        })


class CustomLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })


# ✅ ADMIN ONLY – FETCH AGENTS
class UserListView(generics.ListAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [IsAdmin]   # 🔥 FIX HERE

    def get_queryset(self):
        return User.objects.filter(role="AGENT")


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out"})
        except Exception:
            return Response({"error": "Invalid token"}, status=400)
