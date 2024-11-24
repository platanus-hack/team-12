from ninja import Router
from django.shortcuts import get_object_or_404
from api.models import Inventory
from api.schemas import InventorySchema, CreateInventorySchema

router = Router(tags=["Inventory"])

# CRUD for Inventory
@router.get("/inventories", response=list[InventorySchema])
def list_inventories(request):
    return Inventory.objects.all()

@router.post("/inventories", response=InventorySchema)
def create_inventory(request, inventory: CreateInventorySchema):
    inventory_obj = Inventory.objects.create(**inventory.dict(exclude_unset=True))
    return inventory_obj

@router.get("/inventories/{inventory_id}", response=InventorySchema)
def get_inventory(request, inventory_id: int):
    inventory = get_object_or_404(Inventory, id=inventory_id)
    return inventory

@router.delete("/inventories/{inventory_id}", response={204: None})
def delete_inventory(request, inventory_id: int):
    inventory = get_object_or_404(Inventory, id=inventory_id)
    inventory.delete()
    return 204, None