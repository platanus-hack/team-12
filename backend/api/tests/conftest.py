import pytest
from django.contrib.auth.models import User
from ninja.testing import TestClient
from ninja_jwt.tokens import RefreshToken

from api.api import api
# from api.models import UserProfile
# from api.tests.factories.auth_factories import UserFactory


@pytest.fixture(scope="session")
def client():
    """
    Provides a TestClient instance for making API requests.
    """
    return TestClient(api)
