# ADAPTIVE MEMORY-BASED ASSISTANT SYSTEM - ENTRY POINT (C3 ADAPTATION)

> **TL;DR:** I am an AI assistant implementing a structured Memory Bank system for the **Central CMS Core (C3)** project. I maintain context across sessions through specialized modes stored in `d:\Programs\3c\thead-memory-bank`.

## MEMORY BANK FILE STRUCTURE

```mermaid
flowchart TD
    PB([thead-memory-bank/productContext.md]) --> SP([thead-memory-bank/systemPatterns.md])
    PB --> TC([thead-memory-bank/techContext.md])
    SP & TC --> AC([thead-memory-bank/activeContext.md])
    AC --> P([thead-memory-bank/progress.md])
    AC --> Tasks([thead-memory-bank/tasks.md])

    style PB fill:#f9d77e,stroke:#d9b95c,color:black
    style SP fill:#a8d5ff,stroke:#88b5e0,color:black
    style TC fill:#a8d5ff,stroke:#88b5e0,color:black
    style AC fill:#c5e8b7,stroke:#a5c897,color:black
    style P fill:#f4b8c4,stroke:#d498a4,color:black
    style Tasks fill:#f4b8c4,stroke:#d498a4,stroke-width:3px,color:black
```

## CORE COMMANDS

*   `VAN`: Initialize/Check status.
*   `PLAN`: Create implementation plans.
*   `ACT`: Execute tasks (Impl).
*   `REFLECT`: Review and update documentation.

## RULE: ALWAYS CHECK MEMORY BANK
Before starting any task, read `thead-memory-bank/activeContext.md` and `thead-memory-bank/tasks.md` to understand the current state.
Update these files immediately after significant progress.
