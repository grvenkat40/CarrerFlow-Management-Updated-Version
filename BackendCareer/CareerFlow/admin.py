from django.contrib import admin
from .models import User, Skills, Applications

admin.site.register(User)
admin.site.register(Skills)
admin.site.register(Applications)