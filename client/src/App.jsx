import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

// Components
import MainPage from "./components/Mainpage";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";

// Pages
import Dashboard from "./pages/Dashboard";
import CreateIssue from "./components/CreateIssue";
import CreateTeam from "./components/Dashboards/CreateTeam";
import CommentsList from "./components/comments/CommentsList";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/userprofile" /> : <Login setUser={setUser} />
          }
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/userprofile"
          element={
            user ? (
              <UserProfile user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ Dashboard nested routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        >
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="issue" element={<CreateIssue />} />{" "}
          <Route path="team" element={<CreateTeam />} />{" "}
          <Route path="comment" element={<CommentsList />} />{" "}
          {/* Add more nested routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
