# Backend


Aplicar migraciones:

```bash
docker compose run --rm api python manage.py makemigrations
docker compose run --rm api python manage.py migrate
```

Ejecutar test:

```bash
docker compose exec api pytest
```

Crear superusuario:

```bash
docker compose exec api python manage.py createsuperuser
```

```mermaid
erDiagram

    %% Tablas principales
    USER ||--o{ USERPROFILE : "has"
    USERPROFILE ||--o{ DRAGON : "owns"
    DRAGON }|--|| DRAGONTYPE : "is of type"
    USERPROFILE ||--o{ MISSION : "assigns"
    MISSION }|--|| USERPROFILE : "is assigned to"
    USERPROFILE ||--o{ TRANSACTION : "logs"
    USERPROFILE ||--o{ INVENTORY : "owns"
    INVENTORY }|--|| ITEM : "contains"
    USERPROFILE ||--o{ EVOLUTIONGOAL : "defines"
    EVOLUTIONGOAL }|--|| DRAGONTYPE : "for"
    USERPROFILE ||--o{ ALLOWANCE : "receives"
    ALLOWANCE }|--|| USERPROFILE : "is set by"

    %% USERPROFILE
    USERPROFILE {
        int ProfileID PK
        int UserID FK
        string Role
        int LinkedUserID FK
    }

    %% DRAGON
    DRAGON {
        int DragonID PK
        int UserProfileID FK
        int TypeID FK
        int Phase
        int Experience
        int Treasure
    }

    %% DRAGONTYPE
    DRAGONTYPE {
        int TypeID PK
        string Name
        string Description
        string UnlockRequirements
    }

    %% MISSION
    MISSION {
        int MissionID PK
        string Name
        string Description
        string RewardType
        int RewardAmount
        int AssignedByProfileID FK
        int ForProfileID FK
        string Status
        date DateAssigned
        date DateCompleted
    }

    %% ALLOWANCE
    ALLOWANCE {
        int AllowanceID PK
        int ForProfileID FK
        int DefinedByProfileID FK
        float Amount
        string Frequency
        date NextPaymentDate
    }

    %% TRANSACTION
    TRANSACTION {
        int TransactionID PK
        int UserProfileID FK
        string Type
        float Amount
        string Description
        date Date
    }

    %% INVENTORY
    INVENTORY {
        int InventoryID PK
        int UserProfileID FK
        int ItemID FK
        int Quantity
    }

    %% ITEM
    ITEM {
        int ItemID PK
        string Name
        string Type
        float Price
        string Description
        string UnlockRequirements
    }

    %% EVOLUTIONGOAL
    EVOLUTIONGOAL {
        int EvolutionGoalID PK
        int DragonTypeID FK
        int Phase
        int ExperienceRequired
        int DefinedByProfileID FK
    }


```