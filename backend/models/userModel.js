const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findOrCreateUser = async (profile, accessToken, refreshToken) => {
  // Check if emails array exists and has an email
  const email =
    profile.emails && profile.emails.length > 0
      ? profile.emails[0].value
      : "no-email@example.com"; // Provide a fallback email if none exists

  return await prisma.user.upsert({
    where: { githubId: profile.id },
    update: { accessToken, refreshToken },
    create: {
      githubId: profile.id,
      username: profile.username,
      email: email, // Ensure email is never null
      accessToken,
      refreshToken,
    },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

module.exports = {
  findOrCreateUser,
  findUserById,
};
