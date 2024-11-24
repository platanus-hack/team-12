from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from api.models import Goals
from api.schemas import GoalSchema

router = Router(tags=["Goals"])

@router.get("/", response=List[GoalSchema])
def list_goals(request):
    return list(Goals.objects.all())

@router.get("/{goal_id}", response=GoalSchema)
def get_goal(request, goal_id: int):
    goal = get_object_or_404(Goals, id=goal_id)
    return goal
