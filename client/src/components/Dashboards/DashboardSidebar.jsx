import { useState } from "react";
import {
  Plus,
  Users,
  MessageSquare,
  Search,
  Home,
  Calendar,
  Settings,
  HelpCircle,
  ChevronDown,
  Bug,
  CheckSquare,
  Star,
  Flag,
  Clock,
  FileText,
  AlertTriangle,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("issues");
  const [expandedSections, setExpandedSections] = useState({
    projects: true,
    filters: true,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  const navigate = useNavigate();

  const handleCreateIssue = () => {
    navigate("/dashboard/issue");
  };
  const handleCreateTeam = () => {
    navigate("/dashboard/team");
  };
  const handleComment = () => {
    navigate("/dashboard/comment");
  };
  const projects = [
    { name: "Project Alpha", key: "PA" },
    { name: "Website Redesign", key: "WR" },
    { name: "Mobile App", key: "MA" },
  ];

  const filters = [
    { name: "My open issues", icon: <CheckSquare size={16} /> },
    { name: "Reported by me", icon: <FileText size={16} /> },
    { name: "Recent issues", icon: <Clock size={16} /> },
    { name: "Starred", icon: <Star size={16} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left navigation bar */}
      <div className="w-14 bg-gray-800 text-white flex flex-col items-center py-4 space-y-6">
        <div className="flex flex-col items-center space-y-6">
          <button className="p-2 rounded hover:bg-gray-700">
            <Menu size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-700">
            <Home size={20} />
          </button>
          <button className="p-2 rounded bg-blue-600">
            <Bug size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-700">
            <Calendar size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-700">
            <AlertTriangle size={20} />
          </button>
        </div>
        <div className="mt-auto flex flex-col items-center space-y-6">
          <button className="p-2 rounded hover:bg-gray-700">
            <Settings size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-700">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search issues"
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex mb-6">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center">
              <Plus size={16} className="mr-1" /> Create
            </button>
          </div>

          <div className="mb-6">
            <button
              onClick={() => toggleSection("projects")}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 mb-2"
            >
              <span>Projects</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  expandedSections.projects ? "" : "-rotate-90"
                }`}
              />
            </button>
            {expandedSections.projects && (
              <div className="ml-2 space-y-1">
                {projects.map((project) => (
                  <div
                    key={project.key}
                    className="flex items-center text-sm py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded mr-2 text-xs">
                      {project.key}
                    </div>
                    <span>{project.name}</span>
                  </div>
                ))}
                <div className="text-sm text-blue-600 py-1 px-2 hover:underline cursor-pointer flex items-center">
                  <Plus size={16} className="mr-1" /> Create project
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <button
              onClick={() => toggleSection("filters")}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 mb-2"
            >
              <span>Filters</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  expandedSections.filters ? "" : "-rotate-90"
                }`}
              />
            </button>
            {expandedSections.filters && (
              <div className="ml-2 space-y-1">
                {filters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="mr-2 text-gray-500">{filter.icon}</span>
                    <span>{filter.name}</span>
                  </div>
                ))}
                <div className="text-sm text-blue-600 py-1 px-2 hover:underline cursor-pointer flex items-center">
                  <Plus size={16} className="mr-1" /> Create filter
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Actions
            </div>
            <div className="ml-2 space-y-1">
              <div
                onClick={handleCreateIssue}
                className="flex items-center text-sm py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
              >
                <Plus size={16} className="mr-2 text-gray-500" />
                <span>Create Issue</span>
              </div>
              <div
                onClick={handleCreateTeam}
                className="flex items-center text-sm py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
              >
                <Users size={16} className="mr-2 text-gray-500" />
                <span>Create Team</span>
              </div>
              <div
                onClick={handleComment}
                className="flex items-center text-sm py-1 px-2 rounded hover:bg-gray-200 cursor-pointer"
              >
                <MessageSquare size={16} className="mr-2 text-gray-500" />
                <span>Create Comment</span>
              </div>
              <div className="flex items-center text-sm py-1 px-2 rounded hover:bg-gray-200 cursor-pointer">
                <Flag size={16} className="mr-2 text-gray-500" />
                <span>Report Bug</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - just a placeholder */}
      {/* <div className="flex-1 p-8 bg-white">
        <h1 className="text-2xl font-semibold mb-6">Your Issues</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center text-gray-500">
          Select an action from the sidebar to get started
        </div>
      </div> */}
    </div>
  );
}
