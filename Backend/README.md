
⚙️ Setup Instructions

Follow the steps below to set up and run the project locally.

1️⃣ Clone the Repository
git clone https://github.com/your-username/helpdesk-ticket-management-drf.git
cd helpdesk-ticket-management-drf

2️⃣ Create & Activate Virtual Environment
python -m venv venv


Activate:

Windows

venv\Scripts\activate


Linux / macOS

source venv/bin/activate

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Apply Database Migrations
python manage.py makemigrations
python manage.py migrate

5️⃣ Create Superuser (Admin)
python manage.py createsuperuser


Use this account to access admin features.

6️⃣ Run Django Development Server
python manage.py runserver


Server will run at:

http://127.0.0.1:8000/

🔄 Celery Setup (For Escalation)

Celery is used for background tasks like ticket escalation.

7️⃣ Start Celery Worker

Open a new terminal, activate virtual environment, then run:

celery -A helpdesk_project worker -l info

8️⃣ (Optional) Start Celery Beat

If scheduled escalation checks are used:

celery -A helpdesk_project beat -l info

📧 Email Backend

For demo purposes, the project uses Django’s console email backend, so emails are printed in the terminal.

No SMTP configuration is required.

📘 API Documentation (Swagger)

Swagger UI:

http://127.0.0.1:8000/api/docs/


OpenAPI schema:

http://127.0.0.1:8000/api/schema/

✅ Project Status

Authentication & Authorization ✔

Ticket Management ✔

Agent & Admin Workflow ✔

Asynchronous Escalation ✔

Search & Filtering ✔

API Documentation ✔