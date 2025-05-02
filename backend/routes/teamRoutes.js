const express = require("express");
const router = express.Router();
const {
  createTeam,
  assignUserToTeam,
  getAllTeamMembers,
} = require("../controllers/teamController");

router.post("/create", createTeam);
router.get("/members", getAllTeamMembers);

router.post("/assign-user", assignUserToTeam);

module.exports = router;
