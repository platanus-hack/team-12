from ninja import Router
from typing import List
from api.models import Transaction
from api.schemas import TransactionSchema

router = Router(tags=["Transactions"])

@router.get("/", response=List[TransactionSchema])
def list_transactions(request):
    return Transaction.objects.all()
