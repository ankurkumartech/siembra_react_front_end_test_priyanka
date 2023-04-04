import React, { Fragment } from "react";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

export default function Dashboard() {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner dashboard-page">
            <div className="dashboard-main">
              <h1>Heloo</h1>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
