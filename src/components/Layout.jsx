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
    <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background Effects */}
      
      <header className="bg-black/80 backdrop-blur-md border-b border-cyber-neon/30 shadow-lg shadow-cyber-neon/20 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-mono font-bold text-cyber-neon glow-text tracking-wider">
              {getPageTitle()}
            </h1>
            <div className="bg-gradient-to-r from-cyber-neon to-cyber-cyan rounded-full p-2 shadow-lg shadow-cyber-neon/50 glow-box">
              <ApperIcon name="Wallet" size={20} className="text-black" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 relative z-10">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-cyber-neon/30 z-50 shadow-lg shadow-cyber-neon/20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-300 min-w-0 flex-1 transform hover:scale-105",
                    isActive
                      ? "text-cyber-neon bg-cyber-neon/10 glow-text shadow-lg shadow-cyber-neon/30"
                      : "text-gray-400 hover:text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-md hover:shadow-cyber-cyan/20"
                  )}
                >
                  <ApperIcon
                    name={item.icon}
                    size={20}
                    className={cn(
                      "transition-all duration-300",
                      isActive ? "text-cyber-neon drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]" : "text-gray-400 hover:text-cyber-cyan"
                    )}
                  />
                  <span className="text-xs font-mono font-medium truncate">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
      
      {/* Developer Credit Footer */}
      <footer className="mt-auto py-4 px-4 border-t border-gray-800/50">
        <div className="text-center">
          <p className="text-sm text-gray-400 font-mono tracking-wide">
            <span className="text-cyber-neon glow-text-small">Developed By:</span>{' '}
            <span className="text-white font-semibold">Kamran Ahammed Aman</span>
          </p>
          <p className="text-xs text-gray-500 mt-1 bengali-text">
            ডেভেলপার: কামরান আহাম্মেদ আমান
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;