from ninja import Router
from typing import List
from decimal import Decimal
from django.shortcuts import get_object_or_404
from api.models import Allowance, Transaction, Expenses
from api.schemas import AllowanceSchema, AllowanceUpdateSchema

router = Router(tags=["Allowances"])

@router.get("/", response=List[AllowanceSchema])
def list_allowances(request):
    return Allowance.objects.all()


@router.get("/{allowance_id}", response=AllowanceSchema)
def get_allowance(request, allowance_id: int):
    allowance = get_object_or_404(Allowance, id=allowance_id)
    return allowance


@router.patch("/{allowance_id}/add", response=AllowanceSchema)
def add_to_allowance(request, allowance_id: int, payload: AllowanceUpdateSchema):
    allowance = get_object_or_404(Allowance, id=allowance_id)
    if 'amount' in payload.dict():
        increase_amount = Decimal(payload.amount)
        allowance.amount += increase_amount
        allowance.save()

        Transaction.objects.create(
            transaction_type=Transaction.TransactionType.INCOME,
            amount=increase_amount,
            description=f"Allowance increased by {increase_amount}"
        )

    return allowance


@router.patch("/{allowance_id}/subtract", response=AllowanceSchema)
def subtract_from_allowance(request, allowance_id: int, payload: AllowanceUpdateSchema):
    allowance = get_object_or_404(Allowance, id=allowance_id)
    if 'amount' in payload.dict():
        decrease_amount = Decimal(payload.amount)
        allowance.amount -= decrease_amount
        allowance.save()

        Transaction.objects.create(
            transaction_type=Transaction.TransactionType.EXPENSE,
            amount=decrease_amount,
            description=f"Allowance decreased by {decrease_amount}"
        )

        expenses_wallet = Expenses.objects.create(amount=decrease_amount)
        expenses_wallet.save()
    return allowance
