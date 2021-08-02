import React from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import "./Header.css";

export default function Header() {
  function handleLogout() {
    localStorage.removeItem("user");
    window.history.replace({}, "", "/login");
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
