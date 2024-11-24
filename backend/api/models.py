from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


# class UserProfile(models.Model):
#     """
#     UserProfile extiende el modelo de usuario estándar de Django para añadir roles y relaciones.
#     Un UserProfile puede representar un Padre/Madre o un Hijo/Hija.
#     Además, incluye un campo para vincular perfiles en relaciones Padre-Hijo.
#     """

#     class Role(models.TextChoices):
#         PARENT = "parent", "Padre/Madre"
#         CHILD = "child", "Hijo/Hija"

#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")  # Relación uno a uno con User
#     role = models.CharField(max_length=255, choices=Role.choices)  # Rol del usuario (Padre o Hijo)
#     linked_user = models.OneToOneField(
#         User, null=True, blank=True, on_delete=models.SET_NULL, related_name="linked_profile"
#     )  # Usuario vinculado en relaciones Padre-Hijo

#     def __str__(self):
#         return f"{self.user.username} ({self.get_role_display()})"


class DragonType(models.Model):
    """
    Representa los diferentes tipos de dragones que pueden existir en el juego.
    Incluye un nombre, descripción, y los requisitos necesarios para desbloquearlo.
    """

    name = models.CharField(max_length=255)  # Nombre del tipo de dragón
    description = models.TextField()  # Descripción del tipo de dragón
    unlock_requirements = models.TextField()  # Requisitos para desbloquear este tipo de dragón

    def __str__(self):
        return self.name


class Dragon(models.Model):
    """
    Representa a un dragón propiedad de un usuario (Hijo/Hija).
    Los dragones tienen un tipo, una fase de evolución, experiencia acumulada y un tesoro.
    """

    # user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="dragons")  # Propietario
    dragon_type = models.ForeignKey(DragonType, on_delete=models.CASCADE, related_name="dragons")
    phase = models.IntegerField(default=1)  # Fase actual del dragón
    experience = models.IntegerField(default=0)  # Experiencia acumulada ESTE SI

    # def __str__(self):
    #     return f"Dragón de {self.user_profile.user.username}"


class EvolutionGoal(models.Model):
    """
    Define las metas de evolución para un tipo de dragón en una fase específica.
    Establece cuánta experiencia se necesita para alcanzar la siguiente fase.
    """

    dragon_type = models.ForeignKey(DragonType, on_delete=models.CASCADE, related_name="evolution_goals")
    phase = models.IntegerField()  # Fase de evolución
    experience_required = models.IntegerField()  # Experiencia requerida para esta fase
    # defined_by = models.ForeignKey(
    #     UserProfile, on_delete=models.CASCADE, related_name="defined_evolution_goals"
    # )  # Usuario (Padre/Madre) que definió la meta

    def __str__(self):
        return f"Fase {self.phase} para {self.dragon_type.name}"


class Item(models.Model):
    """
    Representa ítems que los usuarios pueden comprar o desbloquear, como ropa o nuevos tipos de dragón.
    Cada ítem tiene un tipo, precio, descripción y requisitos de desbloqueo.
    """

    name = models.CharField(max_length=255)  # Nombre del ítem
    price = models.IntegerField()  # Precio del ítem
    description = models.TextField()  # Descripción del ítem
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Inventory(models.Model):
    """
    Relaciona a un usuario (Hijo/Hija) con los ítems que posee.
    Cada entrada indica un ítem y la cantidad que posee el usuario.
    """

    # user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="inventory")  # Propietario
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='inventories')  # Ítem en el inventario
    quantity = models.IntegerField(default=1)  # Cantidad del ítem

    # def __str__(self):
    #     return f"{self.quantity} x {self.item.name} de {self.user_profile.user.username}"


class Mission(models.Model):
    """
    Representa misiones asignadas a los usuarios (Hijos/Hijas) por los Padres/Madres.
    Incluye recompensas, estado, y detalles de asignación.
    """

    class RewardType(models.TextChoices):
        EXPERIENCE = "experience", "Experiencia"
        MONEY = "money", "Dinero"

    class Status(models.TextChoices):
        PENDING = "pending", "Pendiente"
        COMPLETED = "completed", "Completada"

    name = models.CharField(max_length=255)  # Nombre de la misión
    description = models.TextField()  # Descripción de la misión
    reward_type = models.CharField(max_length=255, choices=RewardType.choices)  # Tipo de recompensa
    reward_amount = models.IntegerField()  # Cantidad de la recompensa
    # assigned_by = models.ForeignKey(
    #     UserProfile, on_delete=models.CASCADE, related_name="assigned_missions"
    # )  # Asignado por (Padre/Madre)
    # for_user = models.ForeignKey(
    #     UserProfile, on_delete=models.CASCADE, related_name="missions"
    # )  # Asignado a (Hijo/Hija)
    status = models.CharField(max_length=255, choices=Status.choices, default=Status.PENDING)  # Estado de la misión
    date_assigned = models.DateTimeField(auto_now_add=True)  # Fecha de asignación
    date_completed = models.DateTimeField(null=True, blank=True)  # Fecha de completitud

    # def __str__(self):
    #     return f"Misión: {self.name} para {self.for_user.user.username}"


class Allowance(models.Model):
    """
    Representa la mesada que un Padre/Madre asigna a un Hijo/Hija.
    Incluye detalles como la cantidad, frecuencia, y próxima fecha de pago.
    """

    class Frequency(models.TextChoices):
        DAILY = "daily", "Diario"
        WEEKLY = "weekly", "Semanal"
        MONTHLY = "monthly", "Mensual"

    # for_user = models.ForeignKey(
    #     UserProfile, on_delete=models.CASCADE, related_name="allowances"
    # )  # Usuario (Hijo/Hija) que recibe la mesada
    # defined_by = models.ForeignKey(
    #     UserProfile, on_delete=models.CASCADE, related_name="defined_allowances"
    # )  # Usuario (Padre/Madre) que define la mesada
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Cantidad de la mesada

    # def __str__(self):
    #     return f"Mesada de {self.amount} para {self.for_user.user.username}"


class Transaction(models.Model):
    """
    Registra transacciones financieras realizadas por los usuarios (Hijos/Hijas).
    Cada transacción puede ser un ingreso o un gasto.
    """

    class TransactionType(models.TextChoices):
        INCOME = "income", "Ingreso"
        EXPENSE = "expense", "Gasto"

    # user_profile = models.ForeignKey(
    #     UserProfile, on_delete=models.CASCADE, related_name="transactions"
    # )  # Usuario que realiza la transacción
    transaction_type = models.CharField(max_length=255, choices=TransactionType.choices)  # Tipo de transacción
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Cantidad de la transacción
    description = models.TextField()  # Descripción de la transacción
    date = models.DateTimeField(auto_now_add=True)  # Fecha de la transacción

    # def __str__(self):
    #     return f"{self.get_transaction_type_display()} de {self.amount} por {self.user_profile.user.username}"


class Goals(models.Model):
    name = models.TextField()
    reward = models.TextField()
    objective=models.IntegerField()
    image = models.CharField(max_length=255, default="")


class Expenses(models.Model):
    amount = models.IntegerField()
