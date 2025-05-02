import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext"; // Adjust the import path as necessary

const CommentsList = ({ issueId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   const { user } = useAuth();
  const user = [
    { id: 1, name: "Adnan", avatar: "A" },
    { id: 2, name: "Sameer", avatar: "S" },
    { id: 3, name: "Faiz", avatar: "F" },
    { id: 4, name: "Fahad", avatar: "F" },
  ];
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/issues/${issueId}/comments`
        );
        setComments(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Failed to load comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [issueId]);

  const handleAddComment = async (newComment) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/issues/${issueId}/comments`,
        {
          content: newComment.content,
          parentId: newComment.parentId || null,
        }
      );

      if (newComment.parentId) {
        // If this is a reply, update the parent comment's replies
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.id === newComment.parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), response.data],
              };
            }
            return comment;
          })
        );
      } else {
        // If this is a top-level comment, add it to the list
        setComments((prevComments) => [...prevComments, response.data]);
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:4000/comments/${commentId}`);

      // Remove the comment from state
      setComments((prevComments) =>
        prevComments.filter((comment) => {
          if (comment.id === commentId) {
            return false;
          }
          // Also filter out the comment from replies
          if (comment.replies) {
            comment.replies = comment.replies.filter(
              (reply) => reply.id !== commentId
            );
          }
          return true;
        })
      );
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Failed to delete comment. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center py-4">Loading comments...</div>;

  if (error)
    return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* New comment form */}
      <div className="mb-6">
        <CommentForm onSubmit={handleAddComment} />
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={user}
              onAddReply={handleAddComment}
              onDelete={handleDeleteComment}
            />
          ))
        )}
      </div>
    </div>
  );
};

// CommentItem component (nested within the same file)
const CommentItem = ({
  comment,
  currentUser,
  onAddReply,
  onDelete,
  isReply = false,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (replyData) => {
    onAddReply({
      ...replyData,
      parentId: comment.id,
    });
    setShowReplyForm(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment.id);
    }
  };

  return (
    <div className={`${isReply ? "ml-8 mt-3" : "border-t pt-4"}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-medium">
            {comment.author.username.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-grow">
          <div className="flex items-center">
            <h4 className="font-semibold text-sm">{comment.author.username}</h4>
            <span className="mx-2 text-gray-400">•</span>
            <time
              className="text-xs text-gray-500"
              dateTime={comment.createdAt}
            >
              {format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")}
            </time>
          </div>

          <div className="mt-1 text-sm">{comment.content}</div>

          <div className="mt-2 flex gap-4 text-xs">
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              {showReplyForm ? "Cancel" : "Reply"}
            </button>

            {currentUser && currentUser.id === comment.author.id && (
              <button
                className="text-red-600 hover:text-red-800"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-3">
              <CommentForm
                onSubmit={handleReply}
                isReply
                placeholder={`Reply to ${comment.author.username}...`}
              />
            </div>
          )}

          {/* Display replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  onAddReply={onAddReply}
                  onDelete={onDelete}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CommentForm component (nested within the same file)
const CommentForm = ({
  onSubmit,
  isReply = false,
  placeholder = "Write a comment...",
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      await onSubmit({ content });
      setContent(""); // Clear form after successful submission
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <textarea
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={isReply ? 2 : 3}
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`px-4 py-2 rounded-md ${
            isSubmitting || !content.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : isReply ? "Reply" : "Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentsList;
