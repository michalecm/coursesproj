import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function AdminRoute({ component: Component, ...rest }) {
  // eslint-disable-next-line no-debugger
  debugger;
  const isAdmin = useSelector((state) => state.userReducer);
  // eslint-disable-next-line no-console
  console.log(`${isAdmin.role} ${isAdmin.name}`);
  // eslint-disable-next-line no-console
  console.log(`${isAdmin.role === "admin"}`);
  return (
    <Route
      /* eslint-disable react/jsx-props-no-spreading */
      {...rest}
      render={(props) =>
        localStorage.getItem("user") && isAdmin.role === "admin" ? (
          /* eslint-disable react/jsx-props-no-spreading */
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/courses",
            }}
          />
        )
      }
    />
  );
}

AdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
