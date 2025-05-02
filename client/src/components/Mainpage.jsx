import React from "react";
import BugTrackerNavbar from "./BugTrackerNavbar";
import BugTrackerHero from "./BugTrackerHero";
import BugTackerFooter from "./BugTrackerFooter";
const Mainpage = () => {
  return (
    <div>
      <div>
        <BugTrackerNavbar />
      </div>
      <div>
        <BugTrackerHero />
      </div>
      <div>
        <BugTackerFooter />
      </div>
    </div>
  );
};

export default Mainpage;
