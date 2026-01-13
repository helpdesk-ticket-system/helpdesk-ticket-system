"""
Django settings for helpdesk_project project.
"""

from pathlib import Path

# --------------------------------------------------
# BASE
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-change-this-in-production"

DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# --------------------------------------------------
# APPLICATIONS
# --------------------------------------------------
INSTALLED_APPS = [
    "corsheaders",

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "django_filters",
    "drf_spectacular",

    "django_celery_beat",

    "accounts",
    "tickets",
]


# --------------------------------------------------
# MIDDLEWARE  (ORDER MATTERS)
# --------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",   # MUST be first
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# --------------------------------------------------
# URL / WSGI
# --------------------------------------------------
ROOT_URLCONF = "helpdesk_project.urls"

WSGI_APPLICATION = "helpdesk_project.wsgi.application"


# --------------------------------------------------
# TEMPLATES
# --------------------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# --------------------------------------------------
# DATABASE
# --------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# --------------------------------------------------
# PASSWORD VALIDATION
# --------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# --------------------------------------------------
# INTERNATIONALIZATION
# --------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# --------------------------------------------------
# STATIC FILES
# --------------------------------------------------
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# --------------------------------------------------
# CUSTOM USER
# --------------------------------------------------
AUTH_USER_MODEL = "accounts.User"


# --------------------------------------------------
# CORS (FIXED)
# --------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = False

CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
    "accept",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]


# --------------------------------------------------
# DJANGO REST FRAMEWORK (JWT ONLY)
# --------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}


# --------------------------------------------------
# EMAIL (CONSOLE)
# --------------------------------------------------
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
DEFAULT_FROM_EMAIL = "noreply@helpdesk.local"


# --------------------------------------------------
# DRF SPECTACULAR (SWAGGER)
# --------------------------------------------------
SPECTACULAR_SETTINGS = {
    "TITLE": "Helpdesk & Ticket Management API",
    "DESCRIPTION": "API documentation for Helpdesk system (Users, Agents, Admins)",
    "VERSION": "1.0.0",
}
SESSION_ENGINE = "django.contrib.sessions.backends.db"


# --------------------------------------------------
# CELERY (BASIC)
# --------------------------------------------------
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
