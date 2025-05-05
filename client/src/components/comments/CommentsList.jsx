import React, { useState, useEffect } from "react";
import { commentService } from "../../services/commentService";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const CommentsList = ({ issueId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [issueId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const fetchedComments = await commentService.getComments(issueId);
      setComments(fetchedComments);
      setError(null);
    } catch (err) {
      setError("Failed to load comments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCommentUpdated = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  // Organize comments into a thread structure
  const organizeComments = (commentsArray) => {
    const commentMap = {};
    const rootComments = [];

    // First pass: Map all comments by ID
    commentsArray.forEach((comment) => {
      // Create a copy of the comment with a replies array
      const commentWithReplies = { ...comment, replies: [] };
      commentMap[comment.id] = commentWithReplies;
    });

    // Second pass: Organize into threads
    commentsArray.forEach((comment) => {
      if (comment.parentId) {
        // This is a reply, add it to the parent's replies
        if (commentMap[comment.parentId]) {
          commentMap[comment.parentId].replies.push(commentMap[comment.id]);
        } else {
          // Parent not found (might have been deleted), add as root
          rootComments.push(commentMap[comment.id]);
        }
      } else {
        // This is a root comment
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  };

  const threadedComments = organizeComments(comments);

  if (loading) {
    return (
      <div className="py-4 text-center text-gray-500">Loading comments...</div>
    );
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Comments ({comments.length})</h3>

      {currentUser && (
        <CommentForm
          issueId={issueId}
          userId={currentUser.id}
          onCommentAdded={handleCommentAdded}
        />
      )}

      {threadedComments.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-4">
          {threadedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              issueId={issueId}
              onUpdate={handleCommentUpdated}
              onDelete={handleCommentDeleted}
              onReply={handleCommentAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
