import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

// home page component with rainbow animation and navigation links
const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Head>
        <title>Welcome - Freelancer System</title>
        <meta name="description" content="Welcome to the freelancer system" />
        <link rel="icon" href="/favicon.ico" />
        {/* rainbow animation styles for heading */}
        <style>
          {`
            @keyframes rainbow {
              0% { color: #3B82F6; }  /* blue-500 */
              20% { color: #8B5CF6; } /* purple-500 */
              40% { color: #EC4899; } /* pink-500 */
              60% { color: #EF4444; } /* red-500 */
              80% { color: #10B981; } /* emerald-500 */
              100% { color: #3B82F6; } /* blue-500 */
            }
            .rainbow-text {
              animation: rainbow 10s linear infinite;
            }
          `}
        </style>
      </Head>

      <main className="text-center">
        {/* animated title and description */}
        <h1 className="text-6xl font-bold rainbow-text mb-4">
          CP363 Assignment 9
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the Freelancer System
        </p>
        <p className="text-sm text-blue-600 font-bold mb-8">
          By Zaki Rangwala (210546860) and Elvis Lin (169044349){" "}
        </p>
        {/* navigation and external links */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/hire"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Find Services
            </Link>
          </div>
          <a
            href="https://github.com/zakirangwala/cp363-freelancer-system"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>See on GitHub</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
