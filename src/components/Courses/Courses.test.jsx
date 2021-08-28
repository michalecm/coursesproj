import React, { useState as useStateMock } from "react";
import { render, screen } from "@testing-library/react";
import Courses from "./Courses";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

const courses = [
  {
    id: "12",
    title: "sfsfs",
    description: "sdsd",
    creationDate: "12/12/2019",
    duration: 100,
    authors: ["769c7946-9fe3-4e4c-a1e3-ffb4a2a99772"],
  },
  {
    id: "13",
    title: "s525s",
    description: "jkkkk",
    creationDate: "12/12/2018",
    duration: 130,
    authors: [
      "722c7946-9fe3-4e4c-a1e3-ffb4a2a99772",
      "769c7946-9fe3-4e4c-a1e3-ffb4a2a99772",
    ],
  },
  {
    id: "14",
    title: "ghhhh",
    description: "gsgsgs",
    creationDate: "12/12/2017",
    duration: 1012,
    authors: ["722c7946-9fe3-4e4c-a1e3-ffb4a2a99772"],
  },
];

const authors = [
  { id: "769c7946-9fe3-4e4c-a1e3-ffb4a2a99772", name: "Timothy" },
  { id: "722c7946-9fe3-4e4c-a1e3-ffb4a2a99772", name: "Jill" },
];
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: () => ({
    authorsReducer: { authors },
    coursesReducer: {
      courses,
    },
    userReducer: { isAuth: true, role: "admin" },
  }),
}));
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Courses", () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation(() => [courses, setState]);
  });

  test("renders courses", () => {
    render(
      <BrowserRouter>
        <Courses />
      </BrowserRouter>
    );
    expect(screen.getByTestId("courses")).toBeDefined();
    expect(screen.findByText(courses[0].title)).toBeTruthy;
    expect(screen.findByText(courses[1].title)).toBeTruthy;
    expect(screen.findByText(courses[2].title)).toBeTruthy;
  });
});
