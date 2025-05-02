import { useState } from "react";
import {
  Search,
  BugPlay,
  Home,
  CheckCircle,
  Clock,
  Settings,
  Bell,
  HelpCircle,
  User,
  MenuSquare,
  X,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BugTrackerNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added state to track login status
  const navigate = useNavigate();
  // Example function to handle page navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  // Function to handle login navigation
  const handleLoginClick = () => {
    navigate("/login"); // Replace with actual login navigation logic when available
    // Replace with actual navigation logic when available
    setIsMobileMenuOpen(false);
  };

  // Function to toggle login status (for demo purposes)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="w-full bg-slate-800 text-white">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BugPlay size={24} className="text-emerald-400" />
            <span className="text-xl font-bold">BugTracker</span>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => navigateTo("dashboard")}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-700 ${
                currentPage === "dashboard"
                  ? "text-emerald-400 font-medium"
                  : ""
              }`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo("active")}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-700 ${
                currentPage === "active" ? "text-emerald-400 font-medium" : ""
              }`}
            >
              <BugPlay size={18} />
              <span>Active Bugs</span>
            </button>

            <button
              onClick={() => navigateTo("resolved")}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-700 ${
                currentPage === "resolved" ? "text-emerald-400 font-medium" : ""
              }`}
            >
              <CheckCircle size={18} />
              <span>Resolved</span>
            </button>

            <button
              onClick={() => navigateTo("backlog")}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-700 ${
                currentPage === "backlog" ? "text-emerald-400 font-medium" : ""
              }`}
            >
              <Clock size={18} />
              <span>Backlog</span>
            </button>
          </nav>
        </div>

        {/* Right Side - Search, Notifications, Help, Settings, Profile/Login */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bugs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-700 rounded-md pl-9 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-slate-400"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-slate-700">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* Help */}
          <button className="p-2 rounded-full hover:bg-slate-700">
            <HelpCircle size={20} />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-full hover:bg-slate-700">
            <Settings size={20} />
          </button>

          {/* Profile or Login Button */}
          {isLoggedIn ? (
            <button className="flex items-center space-x-2 p-1 rounded hover:bg-slate-700">
              <div className="h-8 w-8 bg-emerald-700 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="font-medium">User</span>
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
            >
              <LogIn size={18} />
              <span className="font-medium">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <BugPlay size={22} className="text-emerald-400" />
          <span className="text-lg font-bold">BugTracker</span>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-1">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuSquare size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 py-2">
          {/* Search */}
          <div className="px-4 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bugs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-700 rounded-md pl-9 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-slate-400"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="mt-2">
            <button
              onClick={() => navigateTo("dashboard")}
              className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-slate-700 ${
                currentPage === "dashboard"
                  ? "bg-slate-700 text-emerald-400"
                  : ""
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo("active")}
              className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-slate-700 ${
                currentPage === "active" ? "bg-slate-700 text-emerald-400" : ""
              }`}
            >
              <BugPlay size={20} />
              <span>Active Bugs</span>
            </button>

            <button
              onClick={() => navigateTo("resolved")}
              className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-slate-700 ${
                currentPage === "resolved"
                  ? "bg-slate-700 text-emerald-400"
                  : ""
              }`}
            >
              <CheckCircle size={20} />
              <span>Resolved</span>
            </button>

            <button
              onClick={() => navigateTo("backlog")}
              className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-slate-700 ${
                currentPage === "backlog" ? "bg-slate-700 text-emerald-400" : ""
              }`}
            >
              <Clock size={20} />
              <span>Backlog</span>
            </button>

            <div className="border-t border-slate-700 my-2"></div>

            <button
              onClick={() => navigateTo("settings")}
              className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-slate-700 ${
                currentPage === "settings"
                  ? "bg-slate-700 text-emerald-400"
                  : ""
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>

            {/* Profile or Login Button based on login status */}
            {isLoggedIn ? (
              <button
                onClick={() => navigateTo("profile")}
                className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-slate-700 ${
                  currentPage === "profile"
                    ? "bg-slate-700 text-emerald-400"
                    : ""
                }`}
              >
                <User size={20} />
                <span>Profile</span>
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center space-x-3 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <LogIn size={20} />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => navigateTo("help")}
              className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-slate-700 ${
                currentPage === "help" ? "bg-slate-700 text-emerald-400" : ""
              }`}
            >
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </button>
          </nav>

          {/* Demo toggle (for demonstration purposes only) */}
          <div className="px-4 py-3 mt-2 border-t border-slate-700">
            <button
              onClick={toggleLogin}
              className="text-sm text-slate-400 hover:text-white"
            >
              {isLoggedIn
                ? "Demo: Switch to logged out"
                : "Demo: Switch to logged in"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
