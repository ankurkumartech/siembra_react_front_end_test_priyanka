import { Route, Redirect } from "react-router-dom";
import React, { Fragment } from "react";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import { ToastContainer } from "react-toastify";

const AppMain = () => {
  console.log("AppMain: ");
  return (
    <Fragment>
      <PrivateRoutes />
      <PublicRoutes />
      <Route
        exact
        path="/"
        render={() => <Redirect to="/student/goal/cc-requirement" />}
      />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
