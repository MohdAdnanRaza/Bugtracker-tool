require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("./services/passportService");
const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ["http://77.37.45.151", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(issueRoutes);
app.use(teamRoutes);
app.use(userRoutes);

app.use(commentsRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
