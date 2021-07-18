import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TYPES } from "../actions/types";

export default function Search() {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  function handleChange(e) {
    setSearchVal(e.target.value);
  }
  function handleFormSubmit(e) {
    dispatch({ type: TYPES.FILTER_COURSES, payload: searchVal });
  }
  return (
    <div className="search-wrapper">
      <form className="search-wrapper-form" onSubmit={handleFormSubmit}>
        <input
          className="search-course"
          type="text"
          placeholder="Enter course name..."
          onChange={handleChange}
        />
        <input className="app-button" type="submit" value="Search" />
      </form>
    </div>
  );
}
