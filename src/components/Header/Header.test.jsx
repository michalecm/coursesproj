import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: () => ({
    isAuth: true,
    name: "George",
  }),
}));

test("Header should have logo", () => {
  render(<Header />);
  expect(screen.getByRole("heading")).toBeDefined();
  expect(screen.getByRole("heading")).toHaveTextContent("CoursesApp");
});

test("Header should display button and name", () => {
  render(<Header />);
  expect(screen.getByRole("button")).toBeDefined();
  expect(screen.getByRole("button")).toHaveTextContent("Logout");
});
