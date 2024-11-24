from ninja import Router
from typing import List
from api.models import Dragon
from ninja import Schema
from api.schemas import DragonSchema


# Create a router for the Dragon model
router = Router(tags=["Dragons"])

@router.get("/", response=List[DragonSchema])
def list_dragons(request):
    """
    Retrieve a list of all dragons.
    """
    qs = Dragon.objects.select_related('dragon_type').all()
    return qs


@router.get("/{dragon_id}", response=DragonSchema)
def get_dragon(request, dragon_id: int):
    """
    Retrieve a specific dragon by its ID.
    """
    dragon = Dragon.objects.select_related('dragon_type').get(id=dragon_id)
    return dragon
