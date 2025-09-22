from django.urls import path
from .views import (
    ProjectListCreateView, MyProjectsView, ProjectDetailView,
    InvestInProjectView, MyInvestmentsView,
    MyContributionsView, AddContributionView,
    UserGroupedView, MeView
)

urlpatterns = [
    # Projects
    path("projects/", ProjectListCreateView.as_view(), name="project-list"),
    path("projects/mine/", MyProjectsView.as_view(), name="my-projects"),
    path("projects/<int:pk>/", ProjectDetailView.as_view(), name="project-detail"),
    path("projects/<int:pk>/invest/", InvestInProjectView.as_view(), name="invest-project"),

    # Investments
    path("investments/", MyInvestmentsView.as_view(), name="my-investments"),

    # Contributions
    path("contributions/", MyContributionsView.as_view(), name="my-contributions"),
    path("contributions/add/", AddContributionView.as_view(), name="add-contribution"),

    # Users
    path("users/grouped/", UserGroupedView.as_view(), name="users-grouped"),
    path("users/me/", MeView.as_view(), name="me"),
]

