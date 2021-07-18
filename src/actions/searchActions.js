import { TYPES } from "./types";

export const filterCourses = (text) => {
  return {
    type: TYPES.FILTER_COURSES,
    payload: text,
  };
};
