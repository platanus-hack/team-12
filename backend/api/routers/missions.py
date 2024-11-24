from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from api.models import Mission
from api.schemas import MissionSchema, MissionCreateSchema, MissionUpdateSchema

router = Router(tags=["Missions"])

@router.get("/", response=List[MissionSchema])
def list_missions(request):
    return Mission.objects.all()

@router.get("/{mission_id}", response=MissionSchema)
def get_mission(request, mission_id: int):
    mission = get_object_or_404(Mission, id=mission_id)
    return mission

@router.post("/", response=MissionSchema)
def create_mission(request, payload: MissionCreateSchema):
    mission = Mission.objects.create(**payload.dict())
    return mission

@router.put("/{mission_id}", response=MissionSchema)
def update_mission(request, mission_id: int, payload: MissionUpdateSchema):
    mission = get_object_or_404(Mission, id=mission_id)
    for attr, value in payload.dict().items():
        setattr(mission, attr, value)
    mission.save()
    return mission

@router.delete("/{mission_id}", response={204: None})
def delete_mission(request, mission_id: int):
    mission = get_object_or_404(Mission, id=mission_id)
    mission.delete()
    return 204


@router.patch("/{mission_id}/switch-status", response=MissionSchema)
def switch_mission_status(request, mission_id: int):
    mission = get_object_or_404(Mission, id=mission_id)
    if mission.status == 'pending':
        mission.status = 'completed'
    elif mission.status == 'completed':
        mission.status = 'pending'
    mission.save()
    return mission
