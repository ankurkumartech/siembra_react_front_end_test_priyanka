import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types"; // or PropTypes = require('prop-types');

/**
 * private route component to prevent unauthorize access
 */
const PublicRoute = ({ component: Component, ...rest }) => {
  // uncomment  when authentication api implement

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PublicRoute;
