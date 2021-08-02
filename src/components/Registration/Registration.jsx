import { React, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Registration.css";

export default function Login() {
  const [registrationState, setRegistrationState] = useState({
    name: "",
    username: "",
    password: "",
  });

  function handleUsernameChange(event) {
    setRegistrationState({
      ...registrationState,
      username: event.target.value,
    });
  }

  function handlePasswordChange(event) {
    setRegistrationState({
      ...registrationState,
      password: event.target.value,
    });
  }

  function handleNameChange(event) {
    setRegistrationState({ ...registrationState, name: event.target.value });
  }

  return (
    <div className="registration-wrapper">
      <h2>Register</h2>
      <form className="registration-form">
        <p className="text-field-header">Name:</p>
        <input
          placeholder="Enter name"
          value={registrationState.name}
          onChange={handleNameChange}
        />
        <p className="text-field-header">Username:</p>
        <input
          placeholder="Enter username"
          value={registrationState.username}
          onChange={handleUsernameChange}
        />
        <p className="text-field-header">Password:</p>
        <input
          type="password"
          placeholder="Enter password"
          value={registrationState.password}
          onChange={handlePasswordChange}
        />
        <Button className="app-button" text="Register" type="submit" />
      </form>
    </div>
  );
}
