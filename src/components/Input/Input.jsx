import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

export default function Input({ type, placeholder, value, name, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
}
Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  placeholder: "",
  value: "",
  name: "",
  onChange: () => {},
};
