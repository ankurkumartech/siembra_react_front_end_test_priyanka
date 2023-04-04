import React, { Fragment } from "react";
import Interest from "../../components/Interest/Interest";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

export default function MyPassion() {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner Student-page">
            {/* <div className="Student-main">
              <h1>My Passion</h1>
            </div> */}
            <Interest />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
