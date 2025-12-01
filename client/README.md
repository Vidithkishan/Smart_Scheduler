
# 📅 Smart Scheduler – Automated Timetable Generator  
### MERN Stack | Automated | Conflict-Free Scheduling

This project is an **Automated Timetable Generator** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.  
It helps colleges and universities generate **optimized, conflict-free timetables** by automatically assigning subjects, teachers, and rooms to valid time slots based on predefined constraints.

---

## 🚀 Features

- Automated conflict-free timetable generation  
- Faculty availability tracking  
- Batch-wise & department-wise scheduling  
- No overlapping classes  
- Admin dashboard to manage:
  - Departments  
  - Faculty  
  - Subjects  
  - Rooms  
  - Timetable Slots  
- Fully responsive React frontend  
- REST API (Node.js + Express)  
- MongoDB for structured data storage  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Axios  
- TailwindCSS / CSS  
- React Router

### **Backend**
- Node.js  
- Express.js  

### **Database**
- MongoDB (Atlas / Local)

---

## 📂 Project Structure

```
Smart_Scheduler/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Vidithkishan/Smart_Scheduler.git
cd Smart_Scheduler
```

---

### **2️⃣ Setup Backend**

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongo_db_connection
PORT=5000
```

Start backend:

```bash
npm start
```

---

### **3️⃣ Setup Frontend**

```bash
cd ../frontend
npm install
npm start
```

Frontend runs on: **http://localhost:3000**  
Backend runs on: **http://localhost:5000**

---

## 🎯 How It Works

1. Admin enters **faculty**, **subjects**, **semesters**, **rooms**, and **availability**.  
2. System applies scheduling constraints:  
   - No teacher overlaps  
   - No room conflicts  
   - Subject hour limits  
   - Batch-wise & department constraints  
3. Algorithm auto-generates an **optimized timetable**.  
4. Timetable is displayed and can be downloaded.

---

## 🧠 Scheduling Algorithm

- Constraint-based timetable generation  
- Conflict checks for teacher, room, and subject load  
- Greedy allocation + backtracking validation  
- Optimized slot selection based on availability  

---

## 📸 Screenshots

(Add these later after uploading images)

```
/assets/screenshots/screen1.png
/assets/screenshots/screen2.png
```

---

## 🔗 GitHub Repository Link

**https://github.com/Vidithkishan/Smart_Scheduler**

---

## 📜 License  

This project is licensed under the **MIT License**.


