from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum


class User(AbstractUser):
    location = models.CharField(max_length=100, blank=True, null=True)

    @property
    def total_contributions(self):
        return self.contributions.aggregate(total=Sum("amount"))["total"] or 0

    @property
    def invested_amount(self):
        return self.investments.aggregate(total=Sum("amount"))["total"] or 0

    @property
    def available_balance(self):
        return self.total_contributions - self.invested_amount


class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=200)
    description = models.TextField()
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    total_invested = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Investment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="investments")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="investments")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} invested {self.amount} in {self.project.title}"


class Contribution(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="contributions")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} contributed {self.amount}"

