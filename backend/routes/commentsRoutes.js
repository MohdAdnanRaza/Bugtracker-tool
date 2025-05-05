const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST a new comment to an issue
router.post("/issues/:id/comments", async (req, res) => {
  try {
    const issueId = parseInt(req.params.id);
    const { content, userId, parentId } = req.body;

    // Ensure the issue exists
    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content,
        issue: { connect: { id: issueId } },
        user: { connect: { id: parseInt(userId) } },
        parentId: parentId ? parseInt(parentId) : null,
      },
      include: {
        user: {
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
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// GET all comments for an issue
router.get("/issues/:id/comments", async (req, res) => {
  try {
    const issueId = parseInt(req.params.id);

    // if (isNaN(issueId)) {
    //   return res.status(400).json({ error: "Invalid issue ID" });
    // }

    const comments = await prisma.comment.findMany({
      where: {
        issueId: issueId, // Simplified to directly provide the value
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// DELETE a comment
router.delete("/comments/:id", async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

// PATCH/UPDATE a comment
router.patch("/comments/:id", async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const { content } = req.body;

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Update the comment
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
});

module.exports = router;
