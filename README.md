🧾 Helpdesk Ticket Management System



A full-stack Helpdesk Ticket Management System built with Django REST Framework (Backend) and React + Vite (Frontend), implementing JWT authentication, role-based dashboards, and real-world ticket workflows.



🚀 Features

🔐 Authentication \& Authorization



JWT-based authentication (access + refresh tokens)



Secure login \& registration



Role-based access control:



User



Agent



Admin



🎫 Ticket Management



Users can:



Create tickets



View their own tickets



Add comments to tickets



Agents can:



View assigned tickets



Update ticket status



Admins can:



View all tickets



Assign tickets to agents



Delete tickets



View ticket statistics



💬 Ticket Comments



Real-time ticket comments



Linked to authenticated users



Permission-controlled access



📊 Dashboards



User Dashboard – personal tickets + comments



Agent Dashboard – assigned tickets + status updates



Admin Dashboard – global ticket management + analytics



🎨 Frontend UI



Modern UI with Tailwind CSS



Glassmorphism login \& register pages



Responsive layout



Clean dashboard design inspired by Jira / Linear



🧱 Tech Stack

Backend



Django



Django REST Framework



SimpleJWT



PostgreSQL / SQLite (dev)



Django Filters



Role-based permissions



Frontend



React (Vite)



Axios



React Router



Tailwind CSS



Context API (Auth management)



📁 Project Structure

helpdesk-ticket-system/

│

├── Backend/

│   ├── accounts/

│   ├── tickets/

│   ├── core/

│   ├── manage.py

│   └── requirements.txt

│

├── Frontend/

│   ├── src/

│   │   ├── api/

│   │   ├── auth/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── tickets/

│   │   └── App.jsx

│   └── package.json

│

└── README.md



⚙️ Installation \& Setup

1️⃣ Clone the Repository

git clone https://github.com/your-username/helpdesk-ticket-system.git

cd helpdesk-ticket-system



2️⃣ Backend Setup (Django)

cd Backend

python -m venv venv

venv\\Scripts\\activate   # Windows

pip install -r requirements.txt

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver





Backend will run at:



http://localhost:8000



3️⃣ Frontend Setup (React)

cd Frontend

npm install

npm run dev





Frontend will run at:



http://localhost:5173



🔑 User Roles

Role	Capabilities

User	Create tickets, comment

Agent	Handle assigned tickets

Admin	Assign, delete, monitor tickets



Roles are assigned at user creation or via Django Admin.



🔐 API Authentication Flow



Login → receive access \& refresh tokens



Tokens stored securely in localStorage



Axios interceptor attaches token automatically



Refresh token used when access expires

