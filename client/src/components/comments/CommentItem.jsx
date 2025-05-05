import React, { useState } from "react";
import { commentService } from "../../services/commentService";
import CommentForm from "./CommentForm";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const CommentItem = ({
  comment,
  currentUser,
  issueId,
  onUpdate,
  onDelete,
  onReply,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const isAuthor = currentUser && currentUser.id === comment.userId;

  const handleEdit = async () => {
    try {
      const updatedComment = await commentService.updateComment(
        comment.id,
        editContent
      );
      onUpdate(updatedComment);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        setIsDeleting(true);
        await commentService.deleteComment(comment.id);
        onDelete(comment.id);
      } catch (error) {
        console.error("Failed to delete comment:", error);
        setIsDeleting(false);
      }
    }
  };

  const handleReplyAdded = (newReply) => {
    onReply(newReply);
    setIsReplying(false);
  };

  return (
    <div className="border-l-2 border-gray-200 pl-4">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        {/* Comment header with author info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="font-medium text-gray-900">
              {comment.user?.username || "Anonymous"}
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <div className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
            </div>
          </div>

          {/* Actions menu (for author only) */}
          {isAuthor && (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-gray-500 hover:text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-xs text-gray-500 hover:text-red-600"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>

        {/* Comment content */}
        {isEditing ? (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        )}

        {/* Reply button */}
        {currentUser && !isEditing && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-xs text-gray-500 hover:text-blue-600"
            >
              Reply
            </button>
          </div>
        )}

        {/* Reply form */}
        {isReplying && (
          <div className="mt-2">
            <CommentForm
              issueId={issueId}
              userId={currentUser.id}
              parentId={comment.id}
              onCommentAdded={handleReplyAdded}
              replyingTo={comment.user?.username}
              onCancelReply={() => setIsReplying(false)}
            />
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center mb-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-gray-500 flex items-center"
            >
              <span
                className={`transform transition-transform ${
                  expanded ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
              <span className="ml-1">
                {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </span>
            </button>
          </div>

          {expanded && (
            <div className="pl-4 space-y-3 mt-2">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  issueId={issueId}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
