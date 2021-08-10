import { React, useState } from "react";
import PropTypes from "prop-types";
import { ENDPOINTS } from "../../util/consts";
import { validateEmail } from "../../util/funcs";
import Button from "../Button/Button";
import "./Registration.css";
import APIService from "../../util/APIService";

export default function Registration({ history }) {
  const [registrationState, setRegistrationState] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleEmailChange(event) {
    setRegistrationState({
      ...registrationState,
      email: event.target.value,
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

  function processFormSubmit(event) {
    if (
      !(
        validateEmail(registrationState.email) &&
        registrationState.name.length > 0 &&
        registrationState.password.length > 0
      )
    ) {
      // eslint-disable-next-line no-alert
      alert("Please enter a valid email address, name, and password.");
      return;
    }
    event.preventDefault();
    APIService.Post(ENDPOINTS.POST_REGISTER, {
      name: registrationState.name,
      email: registrationState.email,
      password: registrationState.password,
    })
      .then(() => {
        history.push("/courses");
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`Registration failed: ${err}`);
      });
  }

  return (
    <div className="registration-wrapper">
      <h2>Register</h2>
      <form className="registration-form" onSubmit={processFormSubmit}>
        <p className="text-field-header">Name:</p>
        <input
          placeholder="Enter name"
          value={registrationState.name}
          onChange={handleNameChange}
        />
        <p className="text-field-header">Email:</p>
        <input
          placeholder="Enter email"
          value={registrationState.email}
          onChange={handleEmailChange}
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

Registration.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
