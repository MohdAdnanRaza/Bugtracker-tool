const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// -------- GitHub Auth --------
exports.githubCallback = (req, res) => {
  res.redirect("/profile");
};

exports.githubGetProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/github");
  }
  res.json(req.user);
};

exports.githubLogout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.redirect("/");
  });
};

// -------- Email/Password Auth --------
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.json({
      message: "Signup successful",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password)
    return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
  res
    .cookie("token", token, { httpOnly: true, sameSite: "Lax" })
    .json({ message: "Login successful", user });
};

exports.jwtGetProfile = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.jwtLogout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
