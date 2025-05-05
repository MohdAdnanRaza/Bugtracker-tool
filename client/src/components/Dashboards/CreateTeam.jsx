// import React, { useState } from "react";
// import axios from "axios";

// const CreateTeam = () => {
//   const [name, setName] = useState("");
//   const [members, setMembers] = useState([]);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/create", { name });
//       alert(`Team created: ${res.data.name}`);
//       setName("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create team");
//     }
//   };

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/members");
//       setMembers(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch members");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           value={name}
//           placeholder="Team Name"
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={{ padding: "8px", marginRight: "10px" }}
//         />
//         <button type="submit" style={{ padding: "8px" }}>
//           Create Team
//         </button>
//       </form>

//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={fetchMembers} style={{ padding: "8px" }}>
//           Get All Team Members
//         </button>
//       </div>

//       {members.length > 0 && (
//         <table border="1" cellPadding="10" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Team ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {members.map((member) => (
//               <tr key={member.id}>
//                 <td>{member.id}</td>
//                 <td>{member.name}</td>
//                 <td>{member.email}</td>
//                 <td>{member.teamId ?? "Unassigned"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CreateTeam;

import React, { useState, useEffect } from "react";

const CreateTeam = () => {
  // States for team creation
  const [teamName, setTeamName] = useState("");

  // States for user assignment
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  // States for issue filtering
  const [filterUserId, setFilterUserId] = useState("");
  const [filterTeamId, setFilterTeamId] = useState("");

  // Data states
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [members, setMembers] = useState([]);

  // UI states
  const [activeTab, setActiveTab] = useState("teams");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Fetch initial data
  useEffect(() => {
    fetchTeams();
    fetchUsers();
    fetchIssues();
  }, []);

  // API calls
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/members");
      const data = await res.json();
      setTeams(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch teams:", err);
      showNotification("Failed to load teams", "error");
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      showNotification("Failed to load users", "error");
      setLoading(false);
    }
  };

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/issues");
      const data = await res.json();
      setIssues(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
      showNotification("Failed to load issues", "error");
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/members");
      const data = await res.json();
      setMembers(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch members:", err);
      showNotification("Failed to load team members", "error");
      setLoading(false);
    }
  };

  const createTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName }),
      });

      if (!res.ok) throw new Error("Failed to create team");

      const data = await res.json();
      setTeams([...teams, data]);
      setTeamName("");
      showNotification(`Team "${data.name}" created successfully`, "success");
      setLoading(false);
    } catch (err) {
      console.error("Failed to create team:", err);
      showNotification("Failed to create team", "error");
      setLoading(false);
    }
  };

  const assignUserToTeam = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !selectedTeamId) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/assign-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(selectedUserId),
          teamId: parseInt(selectedTeamId),
        }),
      });

      if (!res.ok) throw new Error("Failed to assign user");

      await res.json();

      // Update users with new team assignment
      const updatedUsers = users.map((user) =>
        user.id === parseInt(selectedUserId)
          ? { ...user, teamId: parseInt(selectedTeamId) }
          : user
      );

      setUsers(updatedUsers);
      setSelectedUserId("");
      setSelectedTeamId("");
      showNotification("User assigned to team successfully", "success");

      // Refresh members list if viewing them
      if (activeTab === "members") {
        fetchMembers();
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to assign user:", err);
      showNotification("Failed to assign user to team", "error");
      setLoading(false);
    }
  };

  // Filtered issues based on selected filters
  const filteredIssues = issues.filter((issue) => {
    return (
      (filterUserId === "" || issue.assignedToId === parseInt(filterUserId)) &&
      (filterTeamId === "" || issue.teamId === parseInt(filterTeamId))
    );
  });

  // Helper function to show notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Load members when switching to the members tab
  useEffect(() => {
    if (activeTab === "members") {
      fetchMembers();
    }
  }, [activeTab]);

  // Icons as components
  const RefreshIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );

  const UserPlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M16 11h6" />
    </svg>
  );

  const FilterIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );

  const UsersIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white font-medium`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Team Management Dashboard
        </h1>
        <p className="text-gray-600">
          Manage teams, assign users, and track issues
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "teams"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("teams")}
        >
          Teams
        </button>
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "assignment"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("assignment")}
        >
          Assign Users
        </button>
        <button
          className={`py-3 px-6 font-medium ${
            activeTab === "issues"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("issues")}
        >
          Issues
        </button>
        {/* <button
          className={`py-3 px-6 font-medium ${
            activeTab === "members"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("members")}
        >
          Members
        </button> */}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="flex items-center space-x-2">
            <div className="animate-spin h-5 w-5 text-blue-500">
              <RefreshIcon />
            </div>
            <span className="text-gray-600">Loading...</span>
          </div>
        </div>
      )}

      {/* Team Creation */}
      {activeTab === "teams" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-5 h-5 mr-2 text-blue-500">
              <PlusIcon />
            </span>
            Create New Team
          </h2>

          <div className="flex">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              onClick={createTeam}
              className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={loading}
            >
              Create Team
            </button>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Existing Teams</h3>
              <button
                onClick={fetchTeams}
                className="flex items-center text-sm text-blue-500 hover:text-blue-700"
              >
                <span className="w-4 h-4 mr-1">
                  <RefreshIcon />
                </span>
                Refresh
              </button>
            </div>

            {teams.length === 0 ? (
              <p className="text-gray-500 italic">
                No teams found. Create one above.
              </p>
            ) : (
              <div className="bg-gray-50 rounded-md border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {teams.map((team) => (
                    <li
                      key={team.id}
                      className="px-4 py-3 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{team.name}</span>
                        <div className="text-sm text-gray-500">
                          ID: {team.id} · Created:{" "}
                          {new Date(team.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {users.filter((user) => user.teamId === team.id).length}{" "}
                        members
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Assignment */}
      {activeTab === "assignment" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-5 h-5 mr-2 text-blue-500">
              <UserPlusIcon />
            </span>
            Assign User to Team
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select User
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select User --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Team
              </label>
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select Team --</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={assignUserToTeam}
              className="w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={loading || !selectedUserId || !selectedTeamId}
            >
              Assign User to Team
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">
              Current User Assignments
            </h3>

            {users.length === 0 ? (
              <p className="text-gray-500 italic">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.teamId ? (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {teams.find((t) => t.id === user.teamId)?.name ||
                                `Team ${user.teamId}`}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">
                              Unassigned
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Issues */}
      {activeTab === "issues" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-5 h-5 mr-2 text-blue-500">
              <FilterIcon />
            </span>
            Filter Issues
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by User
              </label>
              <select
                value={filterUserId}
                onChange={(e) => setFilterUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Team
              </label>
              <select
                value={filterTeamId}
                onChange={(e) => setFilterTeamId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Teams</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                Issues{" "}
                {filteredIssues.length > 0 && `(${filteredIssues.length})`}
              </h3>
              <button
                onClick={fetchIssues}
                className="flex items-center text-sm text-blue-500 hover:text-blue-700"
              >
                <span className="w-4 h-4 mr-1">
                  <RefreshIcon />
                </span>
                Refresh
              </button>
            </div>

            {filteredIssues.length === 0 ? (
              <p className="text-gray-500 italic">
                No issues found with the selected filters.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredIssues.map((issue) => {
                      const assignedUser = users.find(
                        (u) => u.id === issue.assignedToId
                      );
                      const team = teams.find((t) => t.id === issue.teamId);

                      return (
                        <tr key={issue.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {issue.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {issue.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                issue.status === "open"
                                  ? "bg-green-100 text-green-800"
                                  : issue.status === "in-progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {issue.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                issue.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : issue.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {issue.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {assignedUser
                              ? assignedUser.username
                              : "Unassigned"}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {team ? team.name : "No Team"}
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Team Members */}
      {/* {activeTab === "members" && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-5 h-5 mr-2 text-blue-500">
              <UsersIcon />
            </span>
            Team Members
          </h2>

          <div className="flex justify-end mb-4">
            <button
              onClick={fetchMembers}
              className="flex items-center text-sm text-blue-500 hover:text-blue-700"
            >
              <span className="w-4 h-4 mr-1">
                <RefreshIcon />
              </span>
              Refresh Members
            </button>
          </div>

          {members.length === 0 ? (
            <p className="text-gray-500 italic">No team members found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => {
                    const team = teams.find((t) => t.id === member.teamId);

                    return (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {member.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.teamId || "Unassigned"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.teamId ? (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {team ? team.name : `Team ${member.teamId}`}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">
                              Unassigned
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default CreateTeam;
