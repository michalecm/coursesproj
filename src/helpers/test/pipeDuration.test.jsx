import React from "react";
import { render, screen } from "@testing-library/react";
import formatDuration from "../../util/funcs";
import "@testing-library/jest-dom/extend-expect";

it("should format duration correctly", () => {
  expect(formatDuration(185)).toBe("03:05 hours");
});

it("should format duration correctly", () => {
  expect(formatDuration(180)).toBe("03:00 hours");
});

it("should format duration correctly", () => {
  expect(formatDuration(765)).toBe("12:45 hours");
});
