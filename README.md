# FuelEU Maritime Compliance Platform

A full-stack web application I developed for monitoring, comparing, and managing maritime fuel emissions as per the **FuelEU Maritime Regulation**.  
This platform handles route tracking, compliance comparison, banking, and pooling — all built using **React**, **Node.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

---

## Overview

This project was created as part of the **FuelEU Full Stack Developer Assignment** to demonstrate:
- Clean Hexagonal Architecture (Ports & Adapters)
- Realistic domain-driven modeling
- Integration of frontend + backend + database
- Practical use of AI agents (ChatGPT GPT-5) for end-to-end development

---

## Architecture
``` 
FuelEU_maritime/
├── backend/
│ ├── prisma/ # Prisma ORM schema & migrations
│ ├── src/
│ │ ├── core/ # Domain logic and use-cases
│ │ ├── adapters/
│ │ │ ├── inbound/http # Express routes
│ │ │ └── outbound/ # Database adapter
│ │ └── infrastructure/ # Server configuration
│ ├── docker-compose.yml # PostgreSQL setup
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── adapters/ui # Tabs: Routes, Compare, Banking, Pooling
│ │ ├── App.tsx # Main dashboard component
│ │ └── styles/ # Tailwind setup
│ └── vite.config.ts
│
├── AGENT_WORKFLOW.md # AI usage workflow log
├── REFLECTION.md # Reflection & learnings
└── ROOT_README.md # This file
```
---

## Tech Stack

### Frontend
- React (Vite + TypeScript)
- TailwindCSS
- Axios
- Recharts (for data visualization)

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL (via Docker)
- Jest + Supertest
- TypeScript

---

## Setup & Run Instructions

### Prerequisites
- Node.js v20+
- pnpm or npm v10+
- Docker Desktop running
- Git installed

---

### 1️⃣ Backend Setup
```
cd backend
pnpm install
docker compose up -d # Start PostgreSQL container
npx prisma migrate dev --name init
pnpm run seed # Seed initial data
pnpm run dev # Start server on port 4000


(Optional) Launch Prisma Studio:
npx prisma studio # Opens at http://localhost:5555
```

---
### 2️⃣ Frontend Setup
```
cd frontend
pnpm install
pnpm run dev # Opens app at http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| GET | /routes | Fetch all routes |
| POST | /routes/:id/baseline | Set a route as baseline |
| GET | /routes/comparison | Compare baseline vs other routes |
| GET | /compliance/cb?year=YYYY | Get Compliance Balance |
| POST | /banking/bank | Bank positive CB |
| POST | /banking/apply | Apply banked surplus |
| POST | /pools | Create and validate pooling |

---

## Frontend Features

### Routes
- Display all vessel routes with filters  
- Option to set any route as the baseline

### Compare
- Compares baseline against other routes  
- Shows GHG intensity & percentage difference  
- Marks compliance ✅ / ❌  
- Includes bar chart visualization using Recharts

### Banking
Implements **FuelEU Article 20 (Banking)**  
- Bank positive compliance balances  
- Apply stored surplus to deficit

### Pooling
Implements **FuelEU Article 21 (Pooling)**  
- Validate members based on compliance balance  
- Ensure no participant is worse off  
- Show pool summary (red/green indicator)

---

## Testing

### Run backend tests
```
cd backend
pnpm test
```

Tests include:
- Compliance balance logic  
- Banking & pooling validation  
- HTTP endpoint integration (Supertest)

---

## AI Agent Usage

This entire project was developed collaboratively with **ChatGPT (GPT-5)** as my AI coding partner.  
The AI helped me:
- Design architecture and folder structure  
- Generate backend routes and React components  
- Debug issues related to npm, Prisma, and Docker  
- Write documentation and test cases  

Detailed workflow is documented in `AGENT_WORKFLOW.md`.

---

## Author

**Abhishek Chaursiya**  
B.Tech Electrical Engineering, NIT Delhi  

Built in collaboration with **ChatGPT (GPT-5)** for educational and evaluation purposes.  
This project demonstrates end-to-end **AI-assisted full-stack development** — from backend APIs to frontend UI and testing.

---

## Related Files
- `AGENT_WORKFLOW.md` → AI prompt logs and outputs  
- `REFLECTION.md` → My summary of learnings and AI usage  
- `ROOT_README.md` → Project overview and setup guide  

---

## License

This project is created purely for **educational and demonstration purposes**.  
All code was generated collaboratively between human and AI.

> “This project proves that AI doesn’t replace developers — it enhances how we build, think, and debug.”


