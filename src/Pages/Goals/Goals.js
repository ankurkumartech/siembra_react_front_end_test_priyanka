import React, { Fragment } from "react";
import StudentGoal from "../../components/StudentGoal/StudentGoal";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

export default function Goals() {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner Student-page">
            {/* <div className="Student-main">
              <h1>Student</h1>
            </div> */}
            <StudentGoal />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
