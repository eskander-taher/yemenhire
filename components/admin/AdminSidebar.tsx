"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Clock,
  LogOut,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  Home,
  ExternalLink,
} from "lucide-react";

export default function AdminSidebar() {
  const { logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview & Analytics",
    },
    {
      path: "/admin/jobs",
      label: "Jobs",
      icon: Briefcase,
      description: "Manage Job Postings",
    },
    {
      path: "/admin/tenders",
      label: "Tenders",
      icon: FileText,
      description: "Manage Tender Postings",
    },
    {
      path: "/admin/pending-jobs",
      label: "Pending Jobs",
      icon: Clock,
      description: "Review Job Submissions",
    },
    {
      path: "/admin/pending-tenders",
      label: "Pending Tenders",
      icon: Clock,
      description: "Review Tender Submissions",
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">YH</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">YemenHire</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {/* Back to Website Button */}
        <Link
          href="/en"
          className={`group flex items-center rounded-lg transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-200 mb-3 ${
            isCollapsed ? "justify-center p-2" : "px-3 py-2.5"
          }`}
          title="Back to Website"
        >
          <Home className={`${isCollapsed ? "w-5 h-5" : "w-5 h-5"} text-gray-500 group-hover:text-blue-600`} />
          {!isCollapsed && (
            <div className="ml-3 flex-1 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Back to Website</span>
                <p className="text-xs text-gray-500 mt-0.5">View Main Site</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
            </div>
          )}
        </Link>

        {/* Divider */}
        {!isCollapsed && <div className="border-t border-gray-200 mb-3"></div>}

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              {!isCollapsed && (
                <div className="ml-3 flex-1">
                  <span className="text-sm font-medium">{item.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <div className="space-y-3">
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button className="w-full p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="w-4 h-4 text-gray-500 mx-auto" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <User className="w-4 h-4 text-white" />
            </div>
            <button
              onClick={handleLogout}
              className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mx-auto" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


