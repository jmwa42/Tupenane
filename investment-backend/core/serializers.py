from rest_framework import serializers
from .models import User, Project, Investment, Contribution


class UserSerializer(serializers.ModelSerializer):
    total_contributions = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    invested_amount = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    available_balance = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = User
        fields = [
            "id", "username", "email", "location",
            "total_contributions", "invested_amount", "available_balance"
        ]


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Project
        fields = ["id", "owner", "title", "description", "target_amount", "total_invested", "created_at"]


class InvestmentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    project = serializers.ReadOnlyField(source="project.title")

    class Meta:
        model = Investment
        fields = ["id", "user", "project", "amount", "created_at"]


class ContributionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Contribution
        fields = ["id", "user", "amount", "created_at"]

