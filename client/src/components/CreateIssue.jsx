import { useState, useEffect } from "react";
import {
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  ChevronDown,
  Search,
  Flag,
  X,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import axios from "axios";

// Mock axios since we don't have actual axios in this environment
// const mockAxios = {
//   get: () =>
//     Promise.resolve({
//       data: [
//         {
//           id: 1,
//           title: "Login page is broken",
//           description: "Users cannot log in using SSO",
//           status: "In Progress",
//           priority: "high",
//           assignedToId: 2,
//           createdById: 1,
//           type: "bug",
//         },
//         {
//           id: 2,
//           title: "Dashboard charts not loading",
//           description: "Charts show loading spinner indefinitely",
//           status: "Open",
//           priority: "medium",
//           assignedToId: 3,
//           createdById: 1,
//           type: "bug",
//         },
//         {
//           id: 3,
//           title: "Typo on about page",
//           description: "Company name is misspelled",
//           status: "Open",
//           priority: "low",
//           assignedToId: 1,
//           createdById: 2,
//           type: "task",
//         },
//         {
//           id: 4,
//           title: "Mobile menu doesn't close",
//           description: "Menu stays open after selection on mobile",
//           status: "Resolved",
//           priority: "medium",
//           assignedToId: 2,
//           createdById: 3,
//           type: "bug",
//         },
//       ],
//     }),
//   post: () => Promise.resolve({ data: { success: true } }),
// };

const users = [
  { id: 1, name: "Adnan", avatar: "A" },
  { id: 2, name: "Sameer", avatar: "S" },
  { id: 3, name: "Faiz", avatar: "F" },
  { id: 4, name: "Fahad", avatar: "F" },
];

export default function CreateIssue() {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignedToId: "",
    type: "bug",
  });

  // Fetch issues
  const fetchIssues = async () => {
    setIsLoading(true);
    try {
      // Using our mock axios instead of actual axios
      const res = await axios.get("http://localhost:4000/issues");
      setIssues(res.data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle radio button change for issue type
  const handleTypeChange = (type) => {
    setForm({ ...form, type });
  };

  // Submit new issue
  const handleSubmit = () => {
    const createdById = 1; // Replace with actual user ID
    try {
      // In a real app, we would await the response
      axios.post("http://localhost:4000/issues", {
        ...form,
        createdById,
        status: "Open",
      });

      // Add the new issue to our list (in a real app this would come from the server)
      setIssues([
        {
          id: issues.length + 1,
          ...form,
          createdById,
          status: "Open",
        },
        ...issues,
      ]);

      setForm({
        title: "",
        description: "",
        priority: "medium",
        assignedToId: "",
        type: "bug",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  };

  const filteredIssues =
    filterStatus === "all"
      ? issues
      : issues.filter(
          (issue) => issue.status.toLowerCase() === filterStatus.toLowerCase()
        );

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <ArrowUp className="text-red-500" size={16} />;
      case "medium":
        return <Minus className="text-yellow-500" size={16} />;
      case "low":
        return <ArrowDown className="text-blue-500" size={16} />;
      default:
        return <Minus className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in progress":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIssueTypeIcon = (type) => {
    switch (type) {
      case "bug":
        return <AlertCircle className="text-red-500 mr-2" size={20} />;
      case "feature":
        return <Plus className="text-purple-500 mr-2" size={20} />;
      case "task":
        return <CheckCircle className="text-blue-500 mr-2" size={20} />;
      default:
        return <AlertCircle className="text-red-500 mr-2" size={20} />;
    }
  };

  const getUserById = (id) => {
    return (
      users.find((user) => user.id.toString() === id.toString()) || {
        name: "Unassigned",
        avatar: "?",
      }
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar (simplified version) */}
      {/* <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <div className="text-lg font-semibold text-gray-700">Bug Tracker</div>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            <li className="px-2 py-1 bg-blue-50 rounded text-blue-700">
              Dashboard
            </li>
            <li className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              Projects
            </li>
            <li className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              My Issues
            </li>
            <li className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              Reports
            </li>
            <li className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              Settings
            </li>
          </ul>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Issue Tracker
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search issues..."
                  className="pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                    filterStatus === "all"
                      ? "bg-gray-200"
                      : "bg-white border border-gray-300"
                  }`}
                  onClick={() => setFilterStatus("all")}
                >
                  All Issues
                </button>
                <button
                  className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                    filterStatus === "open"
                      ? "bg-gray-200"
                      : "bg-white border border-gray-300"
                  }`}
                  onClick={() => setFilterStatus("open")}
                >
                  Open
                </button>
                <button
                  className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                    filterStatus === "in progress"
                      ? "bg-gray-200"
                      : "bg-white border border-gray-300"
                  }`}
                  onClick={() => setFilterStatus("in progress")}
                >
                  In Progress
                </button>
                <button
                  className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                    filterStatus === "resolved"
                      ? "bg-gray-200"
                      : "bg-white border border-gray-300"
                  }`}
                  onClick={() => setFilterStatus("resolved")}
                >
                  Resolved
                </button>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? (
                  <>
                    <X size={16} className="mr-2" /> Close Form
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" /> Create Issue
                  </>
                )}
              </button>
            </div>

            {/* Create Issue Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow mb-6 p-6">
                <h2 className="text-lg font-medium mb-4">Create New Issue</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Type
                    </div>
                    <div className="flex space-x-3">
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleTypeChange("bug")}
                      >
                        <input
                          type="radio"
                          checked={form.type === "bug"}
                          readOnly
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Bug</span>
                      </div>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleTypeChange("feature")}
                      >
                        <input
                          type="radio"
                          checked={form.type === "feature"}
                          readOnly
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Feature Request</span>
                      </div>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleTypeChange("task")}
                      >
                        <input
                          type="radio"
                          checked={form.type === "task"}
                          readOnly
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Task</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </div>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Issue title"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </div>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the issue in detail"
                      rows="4"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </div>
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={handleChange}
                      className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Assign To
                    </div>
                    <select
                      name="assignedToId"
                      value={form.assignedToId}
                      onChange={handleChange}
                      className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Unassigned</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                    >
                      Create Issue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Issues List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">
                  {filterStatus === "all"
                    ? "All Issues"
                    : `${
                        filterStatus.charAt(0).toUpperCase() +
                        filterStatus.slice(1)
                      } Issues`}
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredIssues.length} issues found
                </span>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <div className="loader">Loading...</div>
                </div>
              ) : filteredIssues.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No issues found. Create one to get started!
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredIssues.map((issue) => (
                    <li key={issue.id} className="hover:bg-gray-50">
                      <div className="px-6 py-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            {getIssueTypeIcon(issue.type)}
                            <h3 className="text-sm font-medium text-gray-900">
                              {issue.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                issue.status
                              )}`}
                            >
                              {issue.status}
                            </span>
                            <div
                              className="flex items-center"
                              title={`Priority: ${issue.priority}`}
                            >
                              {getPriorityIcon(issue.priority)}
                            </div>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {issue.description}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <div className="flex items-center mr-4">
                            <Clock className="mr-1" size={14} />
                            <span>Created a second ago</span>
                          </div>
                          <div className="flex items-center">
                            <User className="mr-1" size={14} />
                            <div className="flex items-center">
                              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs mr-1 text-white">
                                {getUserById(issue.assignedToId).avatar}
                              </div>
                              <span>
                                {getUserById(issue.assignedToId).name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
