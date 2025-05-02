import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterIssues = () => {
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [filterTeam, setFilterTeam] = useState("");

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
    axios.get("/api/teams").then((res) => setTeams(res.data));
    axios.get("/api/issues").then((res) => setIssues(res.data));
  }, []);

  const filteredIssues = issues.filter((i) => {
    return (
      (filterUser === "" || i.assignedToId === parseInt(filterUser)) &&
      (filterTeam === "" || i.teamId === parseInt(filterTeam))
    );
  });

  return (
    <div>
      <select
        onChange={(e) => setFilterUser(e.target.value)}
        value={filterUser}
      >
        <option value="">Filter by User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setFilterTeam(e.target.value)}
        value={filterTeam}
      >
        <option value="">Filter by Team</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <ul>
        {filteredIssues.map((i) => (
          <li key={i.id}>
            {i.title} - Status: {i.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterIssues;
