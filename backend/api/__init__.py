import os

from .celery import app as celery_app

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
__all__ = ("celery_app",)
