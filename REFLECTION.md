# Reflection: Building the FuelEU Maritime Compliance Platform

## 💡 Overview
This project was a full-stack application built to simulate a real-world compliance platform for the FuelEU Maritime Regulation, focusing on tracking, comparing, and managing vessel emissions and compliance metrics.

The system involved a backend built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, and a frontend developed using **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Throughout the development process, I collaborated with **ChatGPT (GPT-5)** to design, implement, debug, and document the project — using AI as a support tool while handling all integration, testing, and final validation myself.

---

## 🧠 My Development Process

### 1️⃣ Initial Setup
I started by setting up Node.js, pnpm, Docker, and PostgreSQL.  
ChatGPT guided me through Prisma migrations, Docker Compose setup, and basic environment configuration.  
This included fixing:
- Docker not connecting to the database  
- Prisma schema mismatches  
- Dependency version issues  
- TypeScript compilation errors  

By following its instructions carefully and verifying each step, I was able to get the backend running smoothly with a proper database connection.

---

### 2️⃣ Backend Development
The backend followed a **Hexagonal Architecture (Ports & Adapters)** structure.  

- Routes were managed through modular Express routers.  
- Domain logic was separated into `core` modules for clarity.  
- Prisma handled all database models and migrations.  
- Articles 20 and 21 of the FuelEU Regulation were implemented through Banking and Pooling logic respectively.  

I tested all endpoints using **Postman** and **Vitest + Supertest**.  
Whenever I faced logical or migration issues, ChatGPT explained the cause and suggested exact fixes, which I executed and verified locally.

---

### 3️⃣ Frontend Development
The frontend was built using **React (Vite + TypeScript)** and **TailwindCSS** for a clean and fast UI.  
It consisted of four main tabs:

- **Routes Tab** – Displayed all vessel routes and allowed baseline selection  
- **Compare Tab** – Compared GHG intensity and displayed results visually  
- **Banking Tab** – Allowed storing and applying positive compliance balances  
- **Pooling Tab** – Validated pools ensuring no participant ends worse off  

I already had experience with frontend development, so implementing the React structure and API integration was smooth.  
However, ChatGPT helped refine logic in API calls, React state handling, and chart integration using **Recharts**.

---

### 4️⃣ Testing & Verification
After development, I executed backend tests and verified all API routes manually.  
Frontend behavior was tested by connecting both servers (`localhost:4000` and `localhost:5173`) simultaneously.

ChatGPT helped me structure test cases, explain async handling, and debug small mismatches between Prisma data and API responses.  
In the end, the app worked end-to-end with proper data flow and visualization.

✅ Backend APIs functional  
✅ Frontend integration complete  
✅ Database schema verified through Prisma Studio  

---

## 🤖 Role of ChatGPT (GPT-5)

### What ChatGPT Did
- Helped in planning project structure and architecture  
- Provided code for backend routes, Prisma schema, and frontend components  
- Fixed setup issues in Docker, npm, and TypeScript  
- Wrote initial drafts of documentation  
- Explained debugging steps and reasoning  

### What I Did
- Executed, tested, and verified every step manually  
- Fixed real-time logical and configuration errors  
- Handled code restructuring and styling decisions  
- Managed Git commits, merges, and repository cleanup  

ChatGPT acted like a mentor or coding partner, while I handled real-world problem-solving and validation.

---

## 🧩 Key Learnings
- Learned how **backend and frontend communicate** through APIs.  
- Understood and applied **Hexagonal Architecture** practically.  
- Got hands-on experience with **Prisma ORM** and **Docker**.  
- Improved my understanding of **TypeScript typing and modular design**.  
- Realized how AI can accelerate work without reducing understanding.

---

## 🧭 Challenges Faced
| Problem | Solution |
|----------|-----------|
| Prisma migration errors | Recreated schema and ran fresh migrations |
| Docker not connecting | Fixed database URL and restarted containers |
| TypeScript errors | Added strong typing and interfaces |
| Git conflicts | Cleaned `.gitignore`, fixed rebase manually |
| CORS issues | Configured Express middleware properly |

Each issue was solved with ChatGPT’s help, but I made sure to understand *why* every fix worked before applying it.

---
## 🧾 Final Thoughts

This project wasn’t just about completing an assignment — it was about learning **how to collaborate effectively with AI in real-world development**.  
Each issue, command, and configuration taught me something valuable about building and maintaining scalable full-stack systems.

I can now:
- Confidently use **Prisma, Docker, and PostgreSQL** together  
- Clearly understand **frontend–backend data flow**  
- Write, debug, and deploy **TypeScript-based applications**  
- Use AI tools like **ChatGPT (GPT-5)** efficiently for coding, debugging, and documentation  

This experience helped me realize that AI is not a shortcut — it’s a tool that, when used wisely, can make development faster, smarter, and more structured.

---

## 🙌 Credits
**Developer:** Abhishek Chaursiya  
**AI Partner:** ChatGPT (GPT-5)  
**Institution:** NIT Delhi  
**Date:** November 2025  

> “AI didn’t build the project for me — it guided me to build it the right way.”
