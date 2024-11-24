from django.shortcuts import get_object_or_404
from ninja import Router

from api.models import Item
from api.schemas import ItemSchema

router = Router(tags=["Items"])

# CRUD for Item
@router.get("/items", response=list[ItemSchema])
def list_items(request):
    return Item.objects.all()

@router.get("/items/{item_id}", response=ItemSchema)
def get_item(request, item_id: int):
    item = get_object_or_404(Item, id=item_id)
    return item
