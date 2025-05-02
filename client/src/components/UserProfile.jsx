import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Github, Star, BookOpen, LogOut, Home } from "lucide-react";

const UserProfile = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data (you might need to call your backend to invalidate session/token)
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        // Set user to null in App component state
        setUser(null);
        // Redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // Function to navigate to dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header section with welcome message */}
      <div className="bg-blue-50 py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">
            Welcome back, {user.username}.
            <span className="inline-block ml-2 mt-1">
              <svg
                width="120"
                height="20"
                viewBox="0 0 120 20"
                className="text-yellow-500"
              >
                <path
                  d="M0,10 Q30,3 60,10 T120,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mt-6">
            Pick up where you left off in BugTracker
          </p>
        </div>
      </div>

      {/* Navigation buttons at top right */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-6 flex justify-end space-x-4">
        <button
          onClick={goToDashboard}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Home size={18} />
          <span>Go to Dashboard</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Profile and options */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-6">
        {/* User profile card */}
        <div className="border border-slate-200 rounded-lg bg-white shadow-sm p-6 mb-8">
          <div className="flex items-start">
            {/* Profile avatar */}
            <div className="flex-shrink-0 mr-4">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-md flex items-center justify-center font-bold text-xl">
                {user.username
                  ? user.username.substring(0, 2).toUpperCase()
                  : "U"}
              </div>
            </div>

            {/* User details */}
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-slate-900">
                {user.username || "User"}
              </h2>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-slate-700">
                  <User size={18} className="mr-2" />
                  <span>Account ID: {user.id || user._id || "N/A"}</span>
                </div>

                <div className="flex items-center text-slate-700">
                  <Mail size={18} className="mr-2" />
                  <span>{user.email || "Email not available"}</span>
                </div>

                {user.githubId && (
                  <div className="flex items-center text-slate-700">
                    <Github size={18} className="mr-2" />
                    <span>GitHub ID: {user.githubId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action button */}
            <div className="flex-shrink-0 ml-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors font-medium">
                View Activity
              </button>
            </div>
          </div>
        </div>

        {/* Recent activity section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-lg bg-white shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen size={20} className="mr-2 text-blue-600" />
              Recent Projects
            </h3>
            <div className="space-y-3">
              <div className="p-3 hover:bg-slate-50 rounded-md cursor-pointer">
                <div className="font-medium">Bug Tracker Dashboard</div>
                <div className="text-sm text-slate-500">
                  Last accessed 2 days ago
                </div>
              </div>
              <div className="p-3 hover:bg-slate-50 rounded-md cursor-pointer">
                <div className="font-medium">Frontend Features</div>
                <div className="text-sm text-slate-500">
                  Last accessed 5 days ago
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg bg-white shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Star size={20} className="mr-2 text-yellow-500" />
              Quick Links
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 hover:bg-slate-50 rounded-md flex items-center">
                <span className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-3">
                  <User size={16} />
                </span>
                <span>Edit Profile</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-slate-50 rounded-md flex items-center">
                <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                  <Github size={16} />
                </span>
                <span>Connect GitHub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-4">
            Want to explore more features?
          </h3>
          <button className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-6 py-2 rounded-full transition-colors font-medium">
            Explore Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
