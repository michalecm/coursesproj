import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/users/actionCreators";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logOut());
    localStorage.removeItem("user");
    window.location.replace("/login");
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
