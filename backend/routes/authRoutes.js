// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const {
//   githubCallback,
//   getProfile,
//   logout,
// } = require("../controllers/authcontroller");

// router.get(
//   "/auth/github",
//   passport.authenticate("github", { scope: ["user:email"] })
// );

// router.get(
//   "/auth/github/callback",
//   passport.authenticate("github", { failureRedirect: "/" }),
//   githubCallback
// );

// router.get("/profile", getProfile);
// router.get("/logout", logout);

// module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  githubCallback,
  githubGetProfile,
  githubLogout,
  signup,
  login,
  jwtGetProfile,
  jwtLogout,
} = require("../controllers/authcontroller");

// ----- GitHub Auth -----
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
// router.get(
//   "/auth/github/callback",
//   passport.authenticate("github", { failureredirect: "/" }),
//   githubcallback
// );

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:5173/userprofile",
    failureRedirect: "http://localhost:4000/login",
  })
);

router.get("/profile", githubGetProfile);
router.post("/logout", githubLogout);

// ----- Email/Password Auth -----
router.post("/signup", signup);
router.post("/login", login);
router.get("/jwt-profile", jwtGetProfile);
router.get("/jwt-logout", jwtLogout);

module.exports = router;
