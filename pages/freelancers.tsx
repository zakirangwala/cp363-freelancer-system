import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import FreelancerManagement from "../components/FreelancerManagement";

const FreelancersPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Freelancers - Freelancer System</title>
        <meta name="description" content="Manage freelancers in the system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <FreelancerManagement />
      </div>
    </Layout>
  );
};

export default FreelancersPage;
