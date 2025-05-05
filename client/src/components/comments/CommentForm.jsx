import React, { useState } from "react";
import { commentService } from "../../services/commentService";

const CommentForm = ({
  issueId,
  userId,
  parentId = null,
  onCommentAdded,
  replyingTo = null,
  onCancelReply,
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      const commentData = {
        content,
        userId,
        parentId,
      };

      const newComment = await commentService.addComment(issueId, commentData);
      setContent("");
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }

      // If this is a reply, cancel reply mode after submitting
      if (replyingTo && onCancelReply) {
        onCancelReply();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-6">
      <div className="flex flex-col">
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <textarea
            className="w-full px-3 py-2 focus:outline-none"
            rows={parentId ? 2 : 3}
            placeholder={
              parentId ? `Reply to ${replyingTo}...` : "Add a comment..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="flex items-center justify-between p-2 bg-gray-50">
            <div className="text-xs text-gray-500">
              Simple text formatting is supported
            </div>
            <div className="flex gap-2">
              {parentId && onCancelReply && (
                <button
                  type="button"
                  onClick={onCancelReply}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className={`px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 ${
                  isSubmitting || !content.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : parentId
                  ? "Reply"
                  : "Comment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
