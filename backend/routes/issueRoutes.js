const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all issues
router.get("/issues", async (req, res) => {
  const issues = await prisma.issue.findMany({
    include: { createdBy: true, assignedTo: true },
  });
  res.json(issues);
});

// POST new issue
router.post("/issues", async (req, res) => {
  const { title, description, priority, createdById, assignedToId } = req.body;
  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      priority,
      createdById,
      assignedToId,
    },
  });
  res.json(issue);
});

// PATCH update issue
router.patch("/issues/:id", async (req, res) => {
  const { status, priority } = req.body;
  const issue = await prisma.issue.update({
    where: { id: Number(req.params.id) },
    data: { status, priority },
  });
  res.json(issue);
});

// DELETE issue
router.delete("/issues/:id", async (req, res) => {
  await prisma.issue.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Issue deleted" });
});

module.exports = router;
