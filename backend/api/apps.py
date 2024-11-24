import os
import sys

from django.apps import AppConfig


class FrostAwayApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    def ready(self):
        # Verificar si estamos en un entorno de comando de gestión
        if os.environ.get("RUN_MAIN", None) != "true" or "migrate" in sys.argv:
            import api.signals

            return  # No iniciar el cliente MQTT si se ejecuta un comando de gestión
