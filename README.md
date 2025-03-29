# CP363 Assignment 9 - Freelancer System

A full-stack freelancer marketplace system built with Next.js, Prisma, and MySQL. This project was developed for CP363 Databases.


![main-page](https://github.com/user-attachments/assets/0a8f7c51-ec1e-4ce4-b23e-db461067e418)


## Live Demo

- Frontend: [Vercel Deployment](https://cp363-freelancer-system.vercel.app/)
- Backend: Deployed on Railway

## Database Normalization

Our database schema follows the Third Normal Form (3NF) and Boyce-Codd Normal Form (BCNF) principles:

1. **First Normal Form (1NF)**:

   - All tables have a primary key
   - All columns contain atomic values
   - No repeating groups

2. **Second Normal Form (2NF)**:

   - Satisfies 1NF
   - All non-key attributes are fully functionally dependent on the primary key

3. **Third Normal Form (3NF)**:

   - Satisfies 2NF
   - No transitive dependencies
   - Example: User information is stored in a separate table, referenced by Cart and Order tables

4. **BCNF**:
   - Satisfies 3NF
   - For every dependency A → B, A is a superkey
   - Example: Service-Freelancer relationship ensures each service belongs to exactly one freelancer

Tables and their normalized relationships:

- `User`: (id, name, email, password)
- `Freelancer`: (id, name, freelancerOrigin, yearsOfExperience)
- `Service`: (id, freelancerID, name, description, price)
- `Cart`: (id, userID)
- `CartItem`: (id, cartID, serviceID, quantity)
- `Order`: (id, cartID, userID, amount)
- `OrderItem`: (id, orderID, freelancerID, serviceID)
- `Payment`: (id, orderID, paymentMethod)
- `Category`: (id, name)

## Local Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd freelancer-system
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mysql://your_username:your_password@localhost:3306/freelancer_system"
   ```

4. **Set Up Database**

   ```bash
   # Create the database
   mysql -u root -p
   CREATE DATABASE freelancer_system;

   # Apply migrations and seed data
   npx prisma migrate reset --force
   ```

5. **Run Development Server**

   ```bash
   npm run dev
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- User Management
- Service Management
- Freelancer Profiles
- Cart System
- Order Processing
- Payment Integration
- Search and Filtering

## Technologies Used

- **Frontend**: Next.js, TailwindCSS, React
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **ORM**: Prisma
- **Deployment**: Vercel (Frontend), Railway (Backend)

## Project Structure

```
freelancer-system/
├── components/         # React components
├── pages/             # Next.js pages and API routes
├── prisma/            # Database schema and migrations
├── public/            # Static assets
└── styles/            # CSS styles
```

## Contributors

- Zaki Rangwala (210546860)
- Elvis Lin (169044349)

## Course Information

- Course: CP363 Databases
- Assignment: 9
- Term: Winter 2025
