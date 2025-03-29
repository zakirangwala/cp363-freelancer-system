import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import ServiceManagement from "../components/ServiceManagement";

// services page component that displays service management interface
const ServicesPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Services - Freelancer System</title>
        <meta
          name="description"
          content="Manage services in the Freelancer System"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white rounded-lg shadow-lg">
        <ServiceManagement />
      </div>
    </Layout>
  );
};

export default ServicesPage;
