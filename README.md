# Freelancer System

A web-based application for managing freelancers and their services using Next.js and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd freelancer-system
```

2. Install dependencies:

```bash
npm install
```

3. Set up the MySQL database:

- Create a new database named `freelancer_system`
- Update the database configuration in `lib/database.ts` with your MySQL credentials:

```typescript
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ENTER PASSWORD HERE",
  database: "freelancer_system",
});
```

4. Create the required tables in your MySQL database:

```sql
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Service (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    freelancerId INT,
    FOREIGN KEY (freelancerId) REFERENCES User(id)
);
```

## Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

## Features

- User Management
  - Add new users
  - View user list
- Service Management
  - Add new services
  - View service list

## Project Structure

```
freelancer-system/
├── components/
│   ├── UserManagement.tsx
│   └── ServiceManagement.tsx
├── lib/
│   └── database.ts
├── pages/
│   ├── api/
│   │   ├── users.ts
│   │   └── services.ts
│   └── index.tsx
└── public/
```

## Technologies Used

- Next.js
- TypeScript
- MySQL
- Tailwind CSS
- Axios

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
