import React, { Fragment } from "react";
import AthleticsAndActivities from "../../components/AthleticsAndActivities/AthleticsAndActivities";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

export default function Portfolio() {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner portfolio-page">
            {/* <div className="Student-main">
              <h1>ACTIVITIES AND ATHLETICS</h1>
            </div> */}
            <AthleticsAndActivities />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
