import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import CartManagement from "../components/CartManagement";

const CartPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Carts - Freelancer System</title>
        <meta
          name="description"
          content="Manage shopping carts in the system"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <CartManagement />
      </div>
    </Layout>
  );
};

export default CartPage;
