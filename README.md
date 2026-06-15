# CareerFlow 🚀

CareerFlow is a full-stack job application tracking platform that helps job seekers organize and manage their job search journey efficiently. Users can track applications, monitor progress through different hiring stages, manage skills, upload resumes, maintain interview notes, and gain insights through analytics dashboards.

---

## 📌 Features

### Authentication & User Management

* JWT-based Authentication
* User Registration & Login
* Secure User Profile Management

### Job Application Management

* Create Job Applications
* Edit Existing Applications
* Delete Applications
* Search Applications
* Filter Applications
* Track Application Progress

### Status Workflow Management

Applications move through a structured workflow:

```text
Saved
↓
Applied
↓
Interview Scheduled
↓
Interview Completed
↓
Accepted / Rejected
```

The system prevents:

* Invalid backward status transitions
* Modifications after reaching final states (Accepted/Rejected)

### Resume & Notes Management

* Resume Upload
* Personal Notes for Applications
* Interview Tracking

### Dashboard & Analytics

* Application Statistics
* Status Distribution Charts
* Recent Activity Tracking
* Job Search Insights

### Skills Management

* Track and Manage Skills
* Associate Skills with Career Goals

---

## 🏗️ System Architecture

```text
┌────────────────────┐
│     React + Vite   │
│     Frontend UI    │
└─────────┬──────────┘
          │ REST APIs
          ▼
┌────────────────────┐
│ Django REST API    │
│ Authentication     │
│ Business Logic     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ PostgreSQL Database│
└────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* CSS3
* JavaScript (ES6+)

### Backend

* Django
* Django REST Framework
* JWT Authentication

### Database

* PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```text
CareerFlow/
│
├── BackendCareer/
│   ├── CareerFlow/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── FrontendCareerFlow/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Images
### Landing Page
<img width="1366" height="635" alt="image" src="https://github.com/user-attachments/assets/a853d15f-c8b0-491e-b78a-6f7dcb2d9eb4" />

### Dashboard Page
<img width="1366" height="635" alt="image" src="https://github.com/user-attachments/assets/9acbf4af-c36a-4f6c-9392-4ab93f67c0b1" />

### Skills Page
<img width="1366" height="634" alt="image" src="https://github.com/user-attachments/assets/d5b21643-b2e5-4c69-932e-762db630093f" />

### Job Application Creation Page
<img width="1366" height="633" alt="image" src="https://github.com/user-attachments/assets/da52c5ef-d0f1-48c3-a401-7b2d7b244f15" />

### Job Tracker
<img width="1366" height="635" alt="image" src="https://github.com/user-attachments/assets/509114ca-06d4-498a-9cdf-5ce8b3db7780" />

### Status Updation
<img width="1366" height="632" alt="image" src="https://github.com/user-attachments/assets/c8b26390-5d4d-48ba-8480-0eaef108830f" />




## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/careerflow.git
cd careerflow
```

---

## Backend Setup

### Create Virtual Environment

```bash
python -m venv env
```

### Activate Environment

Windows

```bash
env\Scripts\activate
```

Linux/Mac

```bash
source env/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file:

```env
SECRET_KEY=your_secret_key
DEBUG=True

DB_NAME=careerflow
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Start Backend Server

```bash
python manage.py runserver
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd FrontendCareerFlow
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## API Highlights

### Authentication

```http
POST /register/
POST /login/
POST /token/refresh/
```

### Job Applications

```http
GET    /jobs/
POST   /jobs/create/
PUT    /jobs/update/
DELETE /jobs/delete/
```

### Profile

```http
GET    /profile/
PUT    /profile/update/
```

### Skills

```http
GET    /skills/
POST   /skills/create/
```

---

## Screenshots

### Login Page

Add screenshot here

### Dashboard

Add screenshot here

### Job Management

Add screenshot here

### Status Tracking

Add screenshot here

---

## Future Enhancements

* Email Notifications
* AI Resume Suggestions
* Job Recommendation Engine
* Calendar Integration
* Interview Reminder System
* Company Research Dashboard
* Application Export (PDF/Excel)
* Multi-Resume Management

---

## Learning Outcomes

This project demonstrates practical experience in:

* Full Stack Development
* REST API Design
* Authentication & Authorization
* PostgreSQL Database Design
* State Management
* Dashboard Development
* Data Visualization
* Deployment & Production Hosting

---

## Author

**Goondam Ramalingam Venkat**

Aspiring Data Engineer | Python Developer | Full Stack Developer

LinkedIn: Add your LinkedIn URL

GitHub: Add your GitHub URL
