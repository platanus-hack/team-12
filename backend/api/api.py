from ninja import NinjaAPI

from api.routers.dragons import router as dragons_router
from api.routers.missions import router as missions_router
from api.routers.allowances import router as allowances_router
from api.routers.goals import router as goals_router
from api.routers.transactions import router as transactions_router
from api.routers.inventories import router as inventories_router
from api.routers.items import router as items_router
from api.routers.dragonAI import router as dragonAI_router
from api.routers.expenses import router as expenses_router

api = NinjaAPI(title="Hack api", version="1.0.0")
api.add_router("/dragons", dragons_router)
api.add_router("/missions", missions_router)
api.add_router("/allowances", allowances_router)
api.add_router("/goals", goals_router)
api.add_router("/transactions", transactions_router)
api.add_router("/inventories", inventories_router)
api.add_router("/items", items_router)
api.add_router("/dragonAI", dragonAI_router)
api.add_router("/expenses", expenses_router)


@api.get("/status")
def status(request):
    """
    API status check endpoint.

    Returns:
    - A success message confirming the backend is running.
    """
    return {"status": "ok", "message": "Backend is running"}
