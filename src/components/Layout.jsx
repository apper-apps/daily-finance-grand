import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "হোম",
      icon: "Home"
    },
    {
      path: "/history",
      label: "ইতিহাস",
      icon: "History"
    },
    {
      path: "/settings",
      label: "সেটিংস",
      icon: "Settings"
    }
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Daily Finance Tracker";
      case "/history":
        return "লেনদেনের ইতিহাস";
      case "/settings":
        return "সেটিংস";
      default:
        return "Daily Finance Tracker";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-display font-bold text-gray-900">
              {getPageTitle()}
            </h1>
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-full p-2">
              <ApperIcon name="Wallet" size={20} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1",
                    isActive
                      ? "text-accent-600 bg-accent-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <ApperIcon
                    name={item.icon}
                    size={20}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-accent-600" : "text-gray-500"
                    )}
                  />
                  <span className="text-xs font-medium truncate">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;