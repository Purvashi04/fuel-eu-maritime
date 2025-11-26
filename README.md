# Fuel EU Maritime Compliance Platform

A full-stack web application built to simulate and manage **FuelEU Maritime** compliance operations — including route-level GHG comparisons, banking and borrowing of surplus credits, and pooling between ships.  

This project follows a **Hexagonal (Ports & Adapters)** architecture for clean separation between core logic, domain models, and infrastructure.

---

## 🚀 Features

- **Route Management:**  
  Upload and view vessel routes, fuel types, and GHG intensities.

- **Compliance Comparison:**  
  Compare GHG intensity across routes against the baseline.

- **Banking & Borrowing:**  
  Bank surplus compliance credits or apply them toward deficits.

- **Pooling:**  
  Create pools of ships to share compliance credits across the fleet.

- **Interactive Dashboard:**  
  React + Tailwind interface with visual charts powered by Recharts.

---

## 🧩 Architecture Overview

The application is designed using **Clean Architecture / Hexagonal Architecture** principles.  

### **Core (Business Logic)**
- Independent of frameworks or databases.
- Contains all domain models and use cases:
  - `ComputeCB`, `BankSurplus`, `ApplyBanked`, `CreatePool`, etc.

### **Adapters**
- **Inbound (HTTP Controllers):** Express routes for API endpoints.
- **Outbound (Repositories):** PostgreSQL persistence adapters.

### **Frontend**
- Built using **React + TypeScript + Vite**.
- Organized under `src/core` (domain + ports) and `src/adapters` (UI + API).

### **Infrastructure**
- PostgreSQL database with migration scripts.
- Express server with modular routers.

backend/
├── src/
│ ├── core/ (domain + use cases)
│ ├── adapters/
│ │ ├── inbound/http
│ │ └── outbound/postgres
│ └── infrastructure/
│ ├── db/
│ └── server/
└── tests/
frontend/
├── src/
│ ├── core/
│ └── adapters/
└── vite.config.ts


---

## 🛠️ Tech Stack

**Frontend:**
- React (TypeScript)
- Vite + TailwindCSS
- Axios + Recharts

**Backend:**
- Node.js (TypeScript)
- Express
- PostgreSQL + `pg`
- Jest for testing

---
