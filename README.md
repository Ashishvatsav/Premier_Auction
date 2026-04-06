🚀 Premier Auction Platform

A scalable full-stack Auction Bidding System built with modern web technologies, enabling users to create auctions, place bids, and manage personalized watchlists with secure authentication.

⸻

🧠 System Overview

Premier Auction follows a decoupled architecture, where the frontend and backend are independently developed and communicate via REST APIs.

⸻

🏗️ Architecture Diagram (Conceptual)

User (Browser)
      ↓
Frontend (React + Vite)
      ↓ REST API (HTTP + JSON)
Backend (Spring Boot)
      ↓
Database (H2 / SQLite / MySQL)


⸻

🔄 Application Flow

🔐 Authentication Flow
	1.	User logs in via frontend
	2.	Backend validates credentials
	3.	JWT token is generated
	4.	Token is stored in frontend (localStorage)
	5.	All future requests include:
Authorization: Bearer 

⸻

🛒 Auction Flow
	1.	User creates a product
	2.	Frontend sends POST request
	3.	Backend stores product in DB
	4.	Products are fetched and displayed on homepage

⸻

🔨 Bidding Flow
	1.	User enters bid amount
	2.	Frontend sends bid request
	3.	Backend validates:
	•	bid > current price
	4.	Updates highest bid in DB

⸻

⭐ Watchlist Flow
	1.	User clicks “Add to Watchlist”
	2.	Request sent to backend
	3.	Backend stores mapping (user ↔ product)
	4.	Watchlist retrieved via API

⸻

📌 Features
	•	🔐 JWT Authentication & Authorization
	•	🛒 Product/Auction Management
	•	🔨 Real-time Bid Placement Logic
	•	⭐ Personalized Watchlist
	•	🗑️ Ownership-based Product Deletion
	•	🔗 REST API Integration
	•	⚡ Fast UI with Vite

⸻

🧰 Tech Stack

🎨 Frontend
	•	React (TypeScript)
	•	Vite
	•	Tailwind CSS
	•	Fetch API

⚙️ Backend
	•	Spring Boot
	•	Spring Security
	•	JWT Authentication
	•	Spring Data JPA

🗄️ Database
	•	H2 (Development)
	•	SQLite / MySQL (Extendable)

⸻

📂 Project Structure

Premier_Auction/
│
├── project6th/        # Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── routes.tsx
│   │   │   ├── pages/
│   │   │   └── components/
│
├── bidkart/           # Backend Application
│   ├── src/main/java/com/bidkart/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   └── entity/
│
└── README.md


⸻

⚙️ Setup & Installation

1️⃣ Clone Repository

git clone https://github.com/Ashishvatsav/Premier_Auction.git
cd Premier_Auction


⸻

2️⃣ Run Backend

cd bidkart
./mvnw spring-boot:run

Backend runs on:

http://localhost:8080


⸻

3️⃣ Run Frontend

cd project6th
npm install
npm run dev

Frontend runs on:

http://localhost:5173


⸻

🔗 API Design

Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login & JWT
GET	/api/products	Fetch all products
POST	/api/product	Add new product
DELETE	/api/product/{id}	Delete product
POST	/api/bid	Place bid
POST	/api/watchlist	Add to watchlist


⸻

🔐 Security Design
	•	JWT-based authentication
	•	Stateless backend
	•	Token validation via filter
	•	Protected routes

⸻

🚀 Key Highlights
	•	Decoupled frontend-backend architecture
	•	RESTful API design
	•	Secure authentication flow
	•	Modular and scalable code structure
	•	Production-ready foundation

⸻

🔮 Future Enhancements
	•	WebSocket-based real-time bidding
	•	Payment gateway integration
	•	Notification system
	•	Role-based access (Admin/User)
	•	Deployment (AWS / Docker)

⸻

👨‍💻 Author

Ashish Sreevatsav Nandigam

⸻

📢 Conclusion

Premier Auction demonstrates a real-world full-stack system design, focusing on scalability, security, and modular architecture using modern development practices.
