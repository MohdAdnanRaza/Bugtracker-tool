import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignUserToTeam = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState("");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await axios.get("/api/users");
      const teamsRes = await axios.get("/api/teams");
      setUsers(usersRes.data);
      setTeams(teamsRes.data);
    };
    fetchData();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/team/assign-user", { userId, teamId });
      alert("User assigned to team");
    } catch (err) {
      console.error(err);
      alert("Assignment failed");
    }
  };

  return (
    <form onSubmit={handleAssign}>
      <select
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
        required
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setTeamId(e.target.value)}
        value={teamId}
        required
      >
        <option value="">Select Team</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button type="submit">Assign</button>
    </form>
  );
};

export default AssignUserToTeam;
