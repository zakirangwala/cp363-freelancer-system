import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Head>
        <title>Welcome - Freelancer System</title>
        <meta name="description" content="Welcome to the freelancer system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-6xl font-bold text-blue-500 mb-4">CP363 Assignment 9</h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the Freelancer System
        </p>
        <p className="text-sm text-blue-600  font-bold mb-8">By Zaki Rangwala (210546860) and Elvis Lin (169044349) </p>
        <Link
          href="/dashboard"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Dashboard
        </Link>
      </main>
    </div>
  );
};

export default Home;
