import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import "./Header.css";

export default function Header({ history }) {
  function handleLogout() {
    localStorage.removeItem("user");
    history.push("/login");
  }
  return (
    <div className="header">
      <Logo />
      <div className="header-text-wrapper">
        <div className="user-info-header">
          <p>Mason</p>
        </div>
        {/* remove user login token */}
        <Button text="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
