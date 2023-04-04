import React, { Fragment } from "react";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";

export default function Parents() {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner parents-page">
            <div className="parents-main">
              <h1>Parents</h1>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
