import React from "react";
import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import formatDuration from "../../util/funcs";

const courses = [
  {
    id: "12",
    title: "sfsfs",
    description: "sdsd",
    creationDate: "12/12/2019",
    duration: 100,
    authors: ["769c7946-9fe3-4e4c-a1e3-ffb4a2a99772"],
  },
];

const authors = [
  { id: "769c7946-9fe3-4e4c-a1e3-ffb4a2a99772", name: "Timothy" },
];

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: () => ({
    coursesReducer: {
      courses,
    },
    authorsReducer: { authors },
    userReducer: { isAuth: true, role: "admin" },
  }),
}));

test("CourseCard should have title", () => {
  render(
    <BrowserRouter>
      <CourseCard {...courses[0]} />
    </BrowserRouter>
  );
  expect(screen.getByRole("heading")).toBeDefined();
  expect(screen.getByRole("heading")).toHaveTextContent(courses[0].title);
});

test("CourseCard should have duration", () => {
  render(
    <BrowserRouter>
      <CourseCard {...courses[0]} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("formatted-duration")).toBeDefined();
  expect(screen.getByTestId("formatted-duration")).toHaveTextContent(
    formatDuration(courses[0].duration)
  );
});

test("CourseCard should have duration", () => {
  render(
    <BrowserRouter>
      <CourseCard {...courses[0]} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("desc")).toBeDefined();
  expect(screen.getByTestId("desc")).toHaveTextContent(courses[0].description);
});

test("CourseCard should have duration", () => {
  render(
    <BrowserRouter>
      <CourseCard {...courses[0]} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("authors")).toBeDefined();
  expect(screen.getByTestId("authors")).toHaveTextContent(authors[0].name);
});

test("CourseCard should have duration", () => {
  render(
    <BrowserRouter>
      <CourseCard {...courses[0]} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("date")).toBeDefined();
  expect(screen.getByTestId("date")).toHaveTextContent(courses[0].creationDate);
});
