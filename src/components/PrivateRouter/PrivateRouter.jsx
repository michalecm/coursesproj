import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      /* eslint-disable react/jsx-props-no-spreading */
      {...rest}
      render={(props) =>
        localStorage.getItem("user") ? (
          /* eslint-disable react/jsx-props-no-spreading */
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
