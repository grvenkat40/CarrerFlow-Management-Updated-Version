from django.urls import path
from . import views

urlpatterns = [
    path("", views.landing_page),
    path("register/", views.register_user),
    path("login/", views.login_user),

    path("account/", views.account),

    path("users/<str:username>/", views.userDashboard),
    path("user/jobStatuscount/", views.getJobCounts),
    path("user/recentActivity/", views.recentActivity),

    path("user/<int:id>/skills/", views.getSkills),
    path("user/<int:id>/addSkill/", views.add_Skills),
    path("user/<int:id>/skills/<int:skill_id>/delete/", views.deleteSkill),
    
    path("user/<int:id>/saved/", views.getSavedApplications),
    path("user/<int:id>/createJob/", views.createJobApplication),
    path("user/<int:id>/job/<int:job_id>/delete/", views.deleteSavedApplications),

    path("user/alljobs/", views.getAllJobs),
    path("user/<int:job_id>/updateStatus/", views.updated_Job_Status),
]
