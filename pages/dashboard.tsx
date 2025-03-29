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

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  freelancer: {
    name: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Dashboard: NextPage = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    services: 0,
    freelancers: 0,
    orders: 0,
  });
  const [recentServices, setRecentServices] = useState<Service[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [users, services, freelancers, orders] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/services"),
          axios.get("/api/freelancers"),
          axios.get("/api/orders"),
        ]);

        setStats({
          users: users.data.length,
          services: services.data.length,
          freelancers: freelancers.data.length,
          orders: orders.data.length,
        });

        // Get recent services (last 5)
        const recentServicesData = services.data
          .sort((a: Service, b: Service) => b.id - a.id)
          .slice(0, 5);
        setRecentServices(recentServicesData);

        // Get recent users (last 5)
        const recentUsersData = users.data
          .sort((a: User, b: User) => b.id - a.id)
          .slice(0, 5);
        setRecentUsers(recentUsersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-500 mb-8">Dashboard</h1>
          <div className="text-center text-blue-500">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-500 mb-8">Dashboard</h1>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Dashboard - Freelancer System</title>
        <meta
          name="description"
          content="Dashboard for the freelancer system"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold text-white opacity-90">
              Total Users
            </h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.users}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold text-white opacity-90">
              Active Services
            </h2>
            <p className="text-4xl font-bold text-white mt-2">
              {stats.services}
            </p>
          </div>
          <div className="bg-gradient-to-br from-violet-400 to-violet-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold text-white opacity-90">
              Freelancers
            </h2>
            <p className="text-4xl font-bold text-white mt-2">
              {stats.freelancers}
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold text-white opacity-90">
              Total Orders
            </h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.orders}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
              Recent Services
            </h2>
            <div className="space-y-4">
              {recentServices.map((service) => (
                <div
                  key={service.id}
                  className="border-b pb-2 last:border-b-0 hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <h3 className="font-medium text-violet-600">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-emerald-600 font-medium">
                      ${service.price}
                    </span>
                    <span className="text-sm text-amber-600">
                      by {service.freelancer.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-violet-600 mb-4">
              Recent Users
            </h2>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="border-b pb-2 last:border-b-0 hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <h3 className="font-medium text-amber-600">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
