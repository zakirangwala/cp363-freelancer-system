import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

const SuccessPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Payment Successful - Freelancer System</title>
        <meta name="description" content="Payment successful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. Your payment has been processed
            successfully.
          </p>

          <div className="space-x-4">
            <Link
              href="/hire"
              className="inline-block bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Browse More Services
            </Link>
            <Link
              href="/dashboard"
              className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
