from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from .models import Project, Investment, Contribution, User
from .serializers import (
    ProjectSerializer, InvestmentSerializer,
    ContributionSerializer, UserSerializer
)


# 🔹 Projects
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MyProjectsView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# 🔹 Investments
class MyInvestmentsView(generics.ListAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Investment.objects.filter(user=self.request.user)


class InvestInProjectView(generics.CreateAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        project = get_object_or_404(Project, pk=self.kwargs["pk"])
        amount = float(self.request.data.get("amount", 0))

        if amount <= 0:
            raise ValidationError("Amount must be greater than zero.")

        if amount > user.available_balance:
            raise ValidationError("Insufficient balance. Please contribute more before investing.")

        serializer.save(user=user, project=project)
        project.total_invested += amount
        project.save()


# 🔹 Contributions
class MyContributionsView(generics.ListAPIView):
    serializer_class = ContributionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Contribution.objects.filter(user=self.request.user)


class AddContributionView(generics.CreateAPIView):
    serializer_class = ContributionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        amount = float(self.request.data.get("amount", 0))
        if amount <= 0:
            raise ValidationError("Contribution amount must be greater than zero.")
        serializer.save(user=self.request.user)


# 🔹 Users
class UserGroupedView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return User.objects.all().order_by("location")


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

