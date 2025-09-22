from django.contrib import admin
from .models import User, Project, Investment, Contribution


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "location", "total_contributions", "invested_amount", "available_balance")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "owner", "target_amount", "total_invested", "created_at")


@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ("user", "project", "amount", "created_at")


@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = ("user", "amount", "created_at")

