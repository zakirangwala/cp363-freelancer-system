import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

interface Stats {
  users: number;
  services: number;
  freelancers: number;
  orders: number;
}

const Home: NextPage = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    services: 0,
    freelancers: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, services] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/services"),
        ]);
        setStats({
          users: users.data.length,
          services: services.data.length,
          freelancers: 0, // We'll add these endpoints later
          orders: 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.users, color: "bg-blue-500" },
    { label: "Active Services", value: stats.services, color: "bg-green-500" },
    { label: "Freelancers", value: stats.freelancers, color: "bg-purple-500" },
    { label: "Total Orders", value: stats.orders, color: "bg-yellow-500" },
  ];

  return (
    <Layout>
      <Head>
        <title>Dashboard - Freelancer System</title>
        <meta
          name="description"
          content="Freelancer Management System Dashboard"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-lg shadow-lg p-6 text-white`}
            >
              <h2 className="text-xl font-semibold mb-2">{stat.label}</h2>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Services</h2>
            {/* We'll add a table or list of recent services here */}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
            {/* We'll add a table or list of recent users here */}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
