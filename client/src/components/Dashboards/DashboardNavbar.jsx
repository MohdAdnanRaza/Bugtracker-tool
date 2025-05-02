import { useState } from "react";
import { Search, Bell, Settings, HelpCircle, Plus } from "lucide-react";

export default function DashBoardNavbar() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data
  const user = {
    initials: "MA",
    avatarBg: "bg-purple-600",
  };

  return (
    <nav className="bg-white border-b border-gray-200 h-14 flex items-center px-4 sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center mr-4">
        <div className="bg-blue-600 rounded text-white p-1 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 7.2c4.4 0 8-1.2 8-2.6C20 3.2 16.4 2 12 2S4 3.2 4 4.6C4 6 7.6 7.2 12 7.2z" />
            <path d="M4 6.8v3.8c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6V6.8c-1.7 1-4.7 1.6-8 1.6S5.7 7.8 4 6.8z" />
            <path d="M4 12.8v3.8c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6v-3.8c-1.7 1-4.7 1.6-8 1.6s-6.3-.6-8-1.6z" />
          </svg>
        </div>
        <span className="font-bold text-lg">BugTracker</span>
      </div>

      {/* Search bar */}
      <div className="relative flex-grow max-w-2xl mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Right section - Create button and User Profile */}
      <div className="flex items-center ml-auto">
        {/* Create button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded flex items-center mr-3">
          <Plus className="h-4 w-4 mr-1" />
          Create
        </button>

        {/* Premium trial */}
        <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-1 px-3 rounded flex items-center mr-3">
          <span className="mr-1">🎁</span>
          Premium trial
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full mx-1">
          <Bell className="h-5 w-5" />
        </button>

        {/* Help */}
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full mx-1">
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full mx-1">
          <Settings className="h-5 w-5" />
        </button>

        {/* User Avatar */}
        <button className="ml-2">
          <div
            className={`${user.avatarBg} text-white rounded-full w-8 h-8 flex items-center justify-center font-medium`}
          >
            {user.initials}
          </div>
        </button>
      </div>
    </nav>
  );
}
