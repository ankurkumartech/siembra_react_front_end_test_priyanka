import React, { Fragment } from "react";
import AthleticsAndActivities from "../../components/AthleticsAndActivities/AthleticsAndActivities";
import Ladders from "../../components/Ladders/Ladders";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

export default function StudentChecklist() {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner checklist-page">
            <div className="Student-main">
              <h1 className="title-main">College Checklist</h1>
            </div>
            <Ladders />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
