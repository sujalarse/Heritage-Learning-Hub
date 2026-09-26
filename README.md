# Heritage Learning Hub

## Project Overview
Heritage Learning Hub is an interactive, full-stack educational web application designed to help users explore historical monuments, test their cultural knowledge, and empower educators to publish customized learning modules. Built with a unified MERN stack monorepo architecture, the platform features a responsive UI, secure role-based access control, and a dynamic quiz scoring system.

## Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, React Router
* **Backend:** Node.js, Express.js (v5)
* **Database:** MongoDB Atlas (Cloud Edition)
* **Authentication:** JSON Web Tokens (JWT), bcryptjs
* **Deployment:** Render (Unified Web Service)

## Implemented Modules & Detailed Working

### 1. User Authentication & Authorization (RBAC)
* **Working:** The application utilizes a role-based access control (RBAC) system differentiating *Students* and *Teachers*. 
* **Security & Data Flow:** Passwords are mathematically hashed using `bcryptjs` before being saved to MongoDB. Upon successful login, the Express server generates a JSON Web Token (JWT) signed with a hidden environment secret. The React frontend stores this token and attaches it to the Authorization header of subsequent API calls. Backend middleware verifies the token to protect restricted routes (e.g., blocking students from accessing teacher-only upload endpoints).

### 2. Heritage Catalog & Content Management
* **Working:** The platform dynamically renders cultural and architectural information stored in MongoDB. 
* **Data Flow:** When a user navigates to the Explore page, the React frontend issues an API `GET` request to the backend. Express queries the MongoDB `heritages` collection and returns the data in JSON format, which React maps into responsive UI grid cards.
* **Teacher Portal:** Verified educators have access to a dedicated dashboard where they utilize protected `POST` and `PUT` endpoints to seamlessly add new historical sites or edit existing architectural records in the live database.

### 3. Interactive Quiz & Scoring System
* **Working:** Each heritage site includes attached learning modules and interactive quizzes to test user comprehension.
* **Validation & Tracking:** When a student submits a quiz, the frontend captures the selected options and compares them against the correct answer keys retrieved from the database. The system calculates the score dynamically, allowing performance data to be tied to the student's profile for long-term engagement tracking.

### 4. Unified Monorepo & Deployment Architecture
* **Working:** The project bypasses traditional Cross-Origin Resource Sharing (CORS) issues by serving the entire application from a single origin.
* **Static Serving:** When deployed to production, the Vite React frontend is built into a static `dist` folder. The backend `server.js` uses `app.use(express.static())` to serve these optimized files directly to the browser.
* **Express v5 Wildcard Routing:** To ensure seamless Single Page Application (SPA) navigation without 404 errors upon manual page refreshes, the backend utilizes an Express v5 compliant fallback route (`app.get('/{*any}')`). This instructs the server to return React's `index.html` for any unmatched non-API request.

## Local Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/sujalarse/heritage-learning-hub-full.git](https://github.com/sujalarse/heritage-learning-hub-full.git)
cd heritage-learning-hub-full
