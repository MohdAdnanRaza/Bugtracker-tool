// import React from "react";
// import DashBoardNavbar from "../components/Dashboards/DashboardNavbar";
// import DashboardSidebar from "../components/Dashboards/DashboardSidebar";

// const Dashboard = () => {
//   return (
//     <div>
//       <div>
//         <DashBoardNavbar />
//       </div>
//       <div>
//         <DashboardSidebar />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// Dashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import DashBoardNavbar from "../components/Dashboards/DashboardNavbar";
import DashboardSidebar from "../components/Dashboards/DashboardSidebar";

const Dashboard = () => {
  return (
    <div>
      <DashBoardNavbar />
      <div style={{ display: "flex" }}>
        <DashboardSidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet /> {/* This is where nested routes render */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
