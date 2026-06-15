from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from django.db.models import Count
from django.db.models.functions import TruncDate

from .models import User, Skills, Applications

from .serializers import RegisterSerializer, LoginSerializer, SkillSerializer, ApplicationSerializer

@api_view(["GET"])
def landing_page(request):
    return Response("Hii Venakt API working...")

# Register
@api_view(["POST"])
def register_user(request):
    serializer = RegisterSerializer(data = request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message" : "Registration successful!"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=404)

# Login
@api_view(["POST"])
def login_user(request):
    serializer = LoginSerializer(data = request.data)

    if serializer.is_valid():
        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message" : "Login Successful",
                "id" : user.id,
                "username" : f"{user.first_name}-{user.last_name}",
                "email" : user.email,
                "access"  : str(refresh.access_token),
                "refresh" : str(refresh),
            }
        )

    return Response(
        serializer.errors,
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def account(request):
    user = request.user

    return Response({
        "username": user.username,
        "email": user.email,
        "joined" : user.date_joined,
    })

# -----------------------------------
# DASHBOARD
# -----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def userDashboard(request, username):
    if request.user.username != username:
        return Response(
                {"error" : "Unauthorized access"},
                status=403,
        )
    return Response(
        {
            "username" : request.user.username,
            "email" : request.user.email
        }
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getJobCounts(request):

    jobs = Applications.objects.filter(user = request.user)

    data = {
        "totalApplications" : jobs.count(),
        "applied" : jobs.filter(status = "Applied").count(),
        "Interviews": jobs.filter(status="Interview").count(),
        "Offers": jobs.filter(status="Offer").count(),
    }

    return Response(
        data
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recentActivity(request):
    jobs = (
        Applications.objects
        .filter(user=request.user)
        .order_by('-updated_at')[:3]
    )

    serializer = ApplicationSerializer(jobs, many=True)

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def applicationChartData(request):
    data = (
        Applications.objects
        .filter(user = request.uesr)
        .annotate(day = TruncDate('created_at'))
        .values('day')
        .annotate(apps = Count('id'))
        .order_by('day')
    )
    return Response(data)

# -----------------------------------
# SKILLS
# -----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getSkills(request, id):
    # print(username, request.user.username)

    if request.user.id != id:
        return Response(
            {"error" : "Unauthorized"},
            status=403
        )
    
    skills_list = Skills.objects.filter(user = request.user)

    serializer = SkillSerializer(skills_list, many = True)
    
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_Skills(request, id):
    if request.user.id != id:
        return Response(
            {"error" : "Unauthorized"},
            status=403
        )
    serializer = SkillSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save(user = request.user)
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteSkill(request, id, skill_id):
    if request.user.id != id:
        return Response(
            {"error": "Unauthorized"},
            status=403
        )
    try:
        skill = Skills.objects.get(id = skill_id, user = request.user)
    except Skills.DoesNotExist:
        return Response(
            {"error": "Skill not found"},
            status=404
        )
    skill.delete()

    return Response(
        {"message": "Skill deleted successfully"},
        status=200
    )

# -----------------------------------
# ADD JOB APPLICATIONS
# -----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getSavedApplications(request, id):
    if request.user.id != id:
        return Response(
            {"error": "Unauthorized"},
            status=403
        )
    saved_Application = Applications.objects.filter(
        user = request.user,
        status = "Saved"
    )

    serializer = ApplicationSerializer(saved_Application, many = True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createJobApplication(request, id):
    if request.user.id != id:
        return Response(
            {"error": "Unauthorized"},
            status=403
        )
    serializer = ApplicationSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save(user = request.user)
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteSavedApplications(request, id, job_id):
    if request.user.id != id:
        return Response(
            {"error": "Unauthorized"},
            status=403
        )
    try:
        job = Applications.objects.get(id = job_id, user = request.user)
    except Skills.DoesNotExist:
        return Response(
            {"error": "Skill not found"},
            status=404
        )
    job.delete()

    return Response(
        {"message": "Skill deleted successfully"},
        status=200
    )

# -----------------------------------
# TRACK AND UPDATE JOBS
# -----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllJobs(request):
    jobs = Applications.objects.filter(user = request.user)

    serializer = ApplicationSerializer(jobs, many=True)

    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updated_Job_Status(request, job_id):

    try:
        job = Applications.objects.get(user = request.user, id = job_id)
    except Applications.DoesNotExist:
        return Response(
            {"error" : "Job not found!"},
            status=404
        )
    new_status = request.data.get("status")
    if new_status == "Saved":
        new_status = "Applied"

    allowed_statuses = [
        "Applied",
        "Interview",
        "Offer",
        "Accepted",
        "Rejected"
    ]

    if new_status not in allowed_statuses:
        return Response(
            {"error": "Invalid status"},
            status=400
        )
    job.status = new_status
    job.save()

    return Response(
        {
            "success": True,
            "new_status": job.status,
            "message": "Job status updated successfully!"
        }
    )