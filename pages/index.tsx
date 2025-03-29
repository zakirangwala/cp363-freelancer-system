import type { NextPage } from "next";
import Head from "next/head";
import UserManagement from "../components/UserManagement";
import ServiceManagement from "../components/ServiceManagement";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Freelancer System</title>
        <meta name="description" content="Freelancer Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Freelancer System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg">
            <UserManagement />
          </div>

          <div className="bg-white rounded-lg shadow-lg">
            <ServiceManagement />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
