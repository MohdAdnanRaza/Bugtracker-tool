const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        teamId: true,
        team: { select: { name: true } },
      },
    });

    // Map results to include teamName (null if no team)
    const result = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      teamId: user.teamId,
      teamName: user.team ? user.team.name : null,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
