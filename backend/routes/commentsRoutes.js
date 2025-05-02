// src/routes/comments.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/issues/:id/comments", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, parentId } = req.body;
    const userId = req.user.id;

    // Validate issue exists
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // If this is a reply, validate parent comment
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parseInt(parentId) },
      });

      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }

      // Ensure parent comment belongs to the same issue
      if (parentComment.issueId !== parseInt(id)) {
        return res.status(400).json({
          message: "Parent comment does not belong to this issue",
        });
      }
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        issueId: parseInt(id),
        parentId: parentId ? parseInt(parentId) : null,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * GET /api/issues/:id/comments
 * Get all comments for an issue
 */
router.get("/issues/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate issue exists
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Get all comments for the issue
    const comments = await prisma.comment.findMany({
      where: {
        issueId: parseInt(id),
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Organize comments into threads
    const threadedComments = comments.filter(
      (comment) => comment.parentId === null
    );

    res.json(threadedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * DELETE /api/comments/:id
 * Delete a comment
 */
router.delete("/comments/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the comment
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is authorized (comment author)
    if (comment.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete comment
    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
