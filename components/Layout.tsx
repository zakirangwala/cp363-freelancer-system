import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/users", label: "Users", icon: "👥" },
    { href: "/services", label: "Services", icon: "🛠" },
    { href: "/freelancers", label: "Freelancers", icon: "💼" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-blue-600">
          <h1 className="text-white text-xl font-bold">Freelancer System</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                router.pathname === item.href
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : ""
              }`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
