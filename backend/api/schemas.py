"""
Schemas for the FrostAway API

This file contains all the schemas used in the FrostAway API, including schemas for
Guardian Zones, Guardian Position Data, Guardian Telemetry Data, Guardian Alerts,
and Control Methods.
"""

from datetime import datetime
from typing import List, Optional

from ninja import Field, Router, Schema
from ninja.constants import NOT_SET
from pydantic import EmailStr, validator

# ----------------------- Users Schemas -----------------------


# class UserSchema(Schema):
#     id: int = Field(..., example=1)
#     username: str = Field(..., example="user123")
#     email: EmailStr = Field(..., example="user123@gmail.com")
#     role: str = Field(..., example="caretaker")

# ----------------------- Dragons Schemas -----------------------

class EvolutionGoalSchema(Schema):
    phase: int
    experience_required: int


class DragonTypeSchema(Schema):
    id: int
    name: str
    description: str
    evolution_goals: List[EvolutionGoalSchema]


class DragonSchema(Schema):
    id: int
    dragon_type: DragonTypeSchema
    phase: int
    experience: int


# ----------------------- Missions Schemas -----------------------

class MissionSchema(Schema):
    id: int
    name: str
    description: str
    reward_type: str
    reward_amount: int
    status: str
    date_assigned: datetime
    date_completed: Optional[datetime] = None


class MissionCreateSchema(Schema):
    name: str
    description: str
    reward_type: str
    reward_amount: int
    status: Optional[str] = "pending"  # Default to "pending"


class MissionUpdateSchema(Schema):
    name: Optional[str] = None
    description: Optional[str] = None
    reward_type: Optional[str] = None
    reward_amount: Optional[int] = None
    status: Optional[str] = None
    date_completed: Optional[datetime] = None


# ----------------------- Allowances Schemas -----------------------

class AllowanceSchema(Schema):
    id: int
    amount: float


class AllowanceUpdateSchema(Schema):
    amount: float


# ----------------------- Goals Schemas -----------------------

class GoalSchema(Schema):
    id: int
    name: str
    reward: str
    objective: int
    image: str


# ----------------------- Transactions Schemas -----------------------

class TransactionSchema(Schema):
    id: int
    transaction_type: str
    amount: float
    description: str
    date: datetime


# ----------------------- Items Schemas -----------------------

class ItemSchema(Schema):
    id: int
    name: str
    price: int
    description: str
    category: str


# ----------------------- Inventories Schemas -----------------------

class InventorySchema(Schema):
    id: int
    item: ItemSchema
    quantity: int


class CreateInventorySchema(Schema):
    item_id: int
    quantity: int


# ----------------------- Expenses Schemas -----------------------

class ExpenseSchema(Schema):
    id: int
    amount: int


class ExpenseCreateSchema(Schema):
    amount: int
