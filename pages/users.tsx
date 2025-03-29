import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import UserManagement from "../components/UserManagement";

const UsersPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Users - Freelancer System</title>
        <meta
          name="description"
          content="Manage users in the Freelancer System"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white rounded-lg shadow-lg">
        <UserManagement />
      </div>
    </Layout>
  );
};

export default UsersPage;
