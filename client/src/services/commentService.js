import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const commentService = {
  // Get all comments for an issue
  getComments: async (issueId) => {
    try {
      const response = await axios.get(
        `${API_URL}/issues/${issueId}/comments`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },

  // Add a new comment to an issue
  addComment: async (issueId, commentData) => {
    try {
      const response = await axios.post(
        `${API_URL}/issues/${issueId}/comments`,
        commentData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },

  // Update an existing comment
  updateComment: async (commentId, content) => {
    try {
      const response = await axios.patch(
        `${API_URL}/comments/${commentId}`,
        { content },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const response = await axios.delete(`${API_URL}/comments/${commentId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  },
};
