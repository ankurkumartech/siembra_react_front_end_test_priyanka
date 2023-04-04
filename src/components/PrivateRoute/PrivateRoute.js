import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types"; // or PropTypes = require('prop-types');
import cookie from "react-cookies";

/**
 * private route component to prevent unauthorize access
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (cookie.load("userToken") === undefined) {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        } else return <Component {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
