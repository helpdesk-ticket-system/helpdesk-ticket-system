from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        path = request.path
        if path.endswith("/login/") or path.endswith("/register/"):
            return None
        token = request.COOKIES.get("access_token")
        if token:
            request.META["HTTP_AUTHORIZATION"] = f"Bearer {token}"
        return super().authenticate(request)
