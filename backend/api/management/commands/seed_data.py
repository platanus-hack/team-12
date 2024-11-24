from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import DragonType, Dragon, EvolutionGoal, Item, Inventory, Mission, Allowance, Transaction, Goals, Expenses
from django.utils import timezone
from decimal import Decimal

class Command(BaseCommand):
    help = "Seed the database with initial data"

    def handle(self, *args, **kwargs):

                # Create Items and Inventories
        items_data = [
            {
                'name': 'Chupalla',
                'price': 1000,
                'description': 'Chupalla de dragón.',
                'category': 'Ropa',
                'quantity': 2
            },
            {
                'name': 'Polera Platanus',
                'price': 2500,
                'description': 'Una polera poderosa',
                'category': 'Ropa',
                'quantity': 1
            },
            {
                'name': 'Chaqueta',
                'price': 1500,
                'description': 'Una chaqueta estilosa',
                'category': 'Ropa',
                'quantity': 1
            },
            {
                'name': 'Chocolate',
                'price': 1500,
                'description': 'Muy rico chocolate',
                'category': 'Comida',
                'quantity': 1
            }
        ]

        for item_data in items_data:
            item = Item.objects.create(
                name=item_data['name'],
                price=item_data['price'],
                description=item_data['description'],
                category=item_data['category'],
            )
            Inventory.objects.create(
                item=item,
                quantity=item_data['quantity']
            )

        # Create Missions
        mission1 = Mission.objects.create(
            name='Hacer la cama',
            description='Ordena y limpia tu cama al levantarte.',
            reward_type=Mission.RewardType.EXPERIENCE,
            reward_amount=50,
            status=Mission.Status.COMPLETED
        )

        mission2 = Mission.objects.create(
            name='Lavar los platos',
            description='Lava los platos después de la comida.',
            reward_type=Mission.RewardType.EXPERIENCE,
            reward_amount=15,
            status=Mission.Status.PENDING
        )

        mission3 = Mission.objects.create(
            name='Sacar la basura',
            description='Lleva la basura al contenedor más cercano.',
            reward_type=Mission.RewardType.EXPERIENCE,
            reward_amount=5,
            status=Mission.Status.PENDING
        )

        # Create Allowances
        allowance1 = Allowance.objects.create(
            # for_user=user2.profile,  # Uncomment if UserProfile is used
            # defined_by=user1.profile,  # Uncomment if UserProfile is used
            amount=Decimal('1190.00')
        )

        expenses = Expenses.objects.create(
            # for_user=user2.profile,  # Uncomment if UserProfile is used
            # defined_by=user1.profile,  # Uncomment if UserProfile is used
            amount=Decimal('2000.00')
        )

        # Create Transactions
        transaction1 = Transaction.objects.create(
            # user_profile=user2.profile,  # Uncomment if UserProfile is used
            transaction_type=Transaction.TransactionType.INCOME,
            amount=Decimal('5.00'),
            description='Weekly allowance'
        )

        # Create Goals
        goal1 = Goals.objects.create(
            name='Pequeño Tesoro',
            reward='Dragón Mañoso',
            objective=1200,
            image='image1'
        )

        goal2 = Goals.objects.create(
            name='Aliento de Fuego',
            reward='Dragón Mañoso Nivel 2',
            objective=1500,
            image='image2'
        )

        goal3 = Goals.objects.create(
            name='Volando los Cielos',
            reward='Dragón Hada Nivel 1',
            objective=2000,
            image='image3'
        )

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))