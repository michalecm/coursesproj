import React from "react";
import { ADD_COURSE, ADD_COURSES, DELETE_COURSE } from "../actionTypes";

import "@testing-library/jest-dom/extend-expect";
import coursesReducer from "../reducer";

const initState = {
  courses: [],
  isLoading: true,
};

const course = {
  id: "12",
  title: "sfsfs",
  description: "sdsd",
  creationDate: "12/12/2019",
  duration: 100,
  authors: ["769c7946-9fe3-4e4c-a1e3-ffb4a2a99772"],
};

const course2 = {
  id: "14",
  title: "sf5sfs",
  description: "sds6d",
  creationDate: "14/12/2019",
  duration: 244,
  authors: ["779c7946-9fe3-4e4c-a1e3-ffb4a2a99772"],
};

const stateWithCourses = {
  courses: [course, course2],
  isLoading: false,
};

describe("addCourse", () => {
  it("should add empty courses", () => {
    expect(coursesReducer(initState, undefined)).toEqual(initState);
  });

  it("should add real course", () => {
    expect(
      coursesReducer(initState, { type: ADD_COURSE, payload: course })
    ).toEqual({
      courses: [course],
      isLoading: false,
    });
  });

  it("should add real courses", () => {
    expect(
      coursesReducer(initState, {
        type: ADD_COURSES,
        payload: [course, course2],
      })
    ).toEqual({
      courses: [course, course2],
      isLoading: false,
    });
  });

  it("should delete course", () => {
    expect(
      coursesReducer(stateWithCourses, {
        type: DELETE_COURSE,
        payload: course.id,
      })
    ).toEqual({
      courses: [course2],
    });
  });
});
