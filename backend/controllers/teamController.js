const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTeam = async (req, res) => {
  const { name } = req.body;
  try {
    const team = await prisma.team.create({ data: { name } });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTeamMembers = async (req, res) => {
  try {
    const members = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
        users: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Move this OUTSIDE of the above function
const assignUserToTeam = async (req, res) => {
  const { userId, teamId } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { teamId },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTeam,
  getAllTeamMembers,
  assignUserToTeam,
};
