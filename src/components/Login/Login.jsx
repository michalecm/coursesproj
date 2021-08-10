import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { ENDPOINTS } from "../../util/consts";
import { validateEmail } from "../../util/funcs";
import { logIn } from "../../store/users/actionCreators";
import "./Login.css";
import APIService from "../../util/APIService";

export default function Login({ history }) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  function handleUsernameChange(event) {
    setLoginState({ ...loginState, email: event.target.value });
  }

  function handlePasswordChange(event) {
    setLoginState({ ...loginState, password: event.target.value });
  }

  function processLogin(event) {
    event.preventDefault();
    if (!validateEmail(loginState.email) || !loginState.password.length > 0) {
      // eslint-disable-next-line no-alert
      alert("Your password or email is invalid.");
      return;
    }
    APIService.Post(ENDPOINTS.POST_LOGIN, {
      email: loginState.email,
      password: loginState.password,
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.result);
        localStorage.setItem("user", res.result);
        dispatch(
          logIn({
            email: loginState.email,
            name: res.user.name ? res.user.name : "admin",
            isAuth: res.successful,
            token: res.result,
          })
        );
        history.push("/courses");
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <form className="login-form" onSubmit={processLogin}>
        <p className="text-field-header">Username:</p>
        <input
          placeholder="Enter username"
          value={loginState.username}
          onChange={handleUsernameChange}
        />
        <p className="text-field-header">Password:</p>
        <input
          type="password"
          placeholder="Enter password"
          value={loginState.password}
          onChange={handlePasswordChange}
        />
        <Button className="app-button" text="Login" type="submit" />
      </form>
      <p>
        If you do not yet have an account, please register{" "}
        <Link to="/register">here.</Link>
      </p>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
