from rest_framework import serializers
from .models import User, Skills, Applications
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.utils.text import slugify

#User table serializer which makes communication between frontend and Django smooth by converting models into json fromat.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        email = validated_data["email"]

        if User.objects.filter(email = email).exists():
            raise serializers.ValidationError(
                "User already eixsts!"
            )
    
        user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=email
        )

        user.set_password(
            validated_data["password"]
        )

        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only = True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user_obj = User.objects.get(email = email)
        except Exception as e:
            raise serializers.ValidationError(
                "Invalied email"
            )

        user = authenticate(
            username = user_obj.username,
            password = password
        )
        if not user:
            raise serializers.ValidationError(
                "Invalid Password!"
            )
        attrs["user"] = user
        return attrs
        
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ["id", "skill_name", "skill_level", "created_at"]

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = [
            "id",
            "companyName",
            "roleName",
            "location",
            "jobType",
            "sourceName",
            "salary",
            "status",
            "created_at",
            "updated_at",
        ]

        