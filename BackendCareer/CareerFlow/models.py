from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

class User(AbstractUser):
    slug = models.SlugField(unique=True, blank=True)
    def save(self, *args, **kwargs):
        if not self.username and self.first_name and self.last_name:
            base_username = slugify(f"{self.first_name}-{self.last_name}")
            username = base_username
            cnt = 1
            User = self.__class__
            while User.objects.filter(username = username).exists():
                username = f"{base_username}-{cnt}"
                cnt += 1
            self.username = username
        
        if not self.slug:
            base_slug = slugify(self.username)
            slug = base_slug
            cnt = 1
            User = self.__class__
            while User.objects.filter(slug = slug).exists():
                slug = f"{base_slug}-{cnt}"
                cnt += 1
            self.slug = slug

        return super().save( *args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"
    
class Skills(models.Model):
    LEVEL_CHOICE=[
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill_name = models.CharField(max_length=100)
    skill_level = models.CharField(max_length=50, choices=LEVEL_CHOICE)
    created_at = models.DateField(auto_now_add=True)

class Applications(models.Model):
    JOBTYPE_CHOICE =[
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Internship", "Internship"),
        ("Contract", "Contract"),
        ("Freelance", "Freelance")
    ]
    STATUS_CHOICES = [
    ("Saved", "Saved"),
    ("Applied", "Applied"),
    ("Interview", "Interview"),
    ("Offer", "Offer"),
    ("Accepted", "Accepted"),
    ("Rejected", "Rejected"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    companyName = models.CharField(max_length=150)
    roleName = models.CharField(max_length=150)
    location = models.CharField(max_length = 250)
    jobType = models.CharField(max_length=150, choices=JOBTYPE_CHOICE)
    sourceName = models.CharField(max_length=50)
    salary = models.CharField(max_length=50)
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Saved"
    )
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)