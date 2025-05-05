import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentList from "./CommentList";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/issues/${id}`, {
          withCredentials: true,
        });
        setIssue(response.data);
        setStatus(response.data.status);
        setPriority(response.data.priority);
      } catch (err) {
        setError("Failed to fetch issue details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  const handleUpdateIssue = async () => {
    try {
      await axios.patch(
        `${API_URL}/issues/${id}`,
        { status, priority },
        { withCredentials: true }
      );
      // Update the local state
      setIssue((prev) => ({ ...prev, status, priority }));
    } catch (err) {
      console.error("Failed to update issue:", err);
    }
  };

  const handleDeleteIssue = async () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      try {
        await axios.delete(`${API_URL}/issues/${id}`, {
          withCredentials: true,
        });
        navigate("/issues");
      } catch (err) {
        console.error("Failed to delete issue:", err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading issue details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!issue) {
    return <div className="text-center py-8">Issue not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/issues/${id}/edit`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteIssue}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Assigned To
            </h3>
            <div className="text-gray-900">
              {issue.assignedTo ? issue.assignedTo.username : "Unassigned"}
            </div>
          </div>
        </div>

        <button
          onClick={handleUpdateIssue}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
        >
          Save Changes
        </button>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Description
          </h2>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{issue.description}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6">
          <div className="flex items-center text-sm text-gray-500">
            <span>Created by {issue.createdBy?.username || "Unknown"}</span>
            <span className="mx-2">•</span>
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <CommentList issueId={id} currentUser={user} />
      </div>
    </div>
  );
};

export default IssueDetail;
