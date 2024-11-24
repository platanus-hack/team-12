from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from api.models import Expenses
from api.schemas import ExpenseSchema, ExpenseCreateSchema


# Create a router for expenses
router = Router(tags=["Expenses"])

# Read all expenses
@router.get("/", response=List[ExpenseSchema])
def list_expenses(request):
    return list(Expenses.objects.all())

# Read a single expense by ID
@router.get("/{expense_id}", response=ExpenseSchema)
def get_expense(request, expense_id: int):
    expense = get_object_or_404(Expenses, id=expense_id)
    return expense

@router.post("/", response=ExpenseSchema)
def create_expense(request, payload: ExpenseCreateSchema):
    expense = Expenses.objects.create(**payload.dict())
    return expense
