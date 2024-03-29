import React from "react";

export default function Header() {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <h2>CoursesApp</h2>
      </div>
      <div className="header-text-wrapper">
        <div className="user-info-header">
          <p>Mason</p>
        </div>
        <button className="app-button">logout</button>
      </div>
    </div>
  );
}
