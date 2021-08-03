import { ADD_AUTHOR, DELETE_AUTHOR } from "./actionTypes";

const authorsInitialState = {
  authors: [], /// default value - empty array. After success getting courses from API - array of courses.
  // See Swagger `/courses/all`
};

const authorsReducer = (state = authorsInitialState, action) => {
  if (action === undefined) {
    return state;
  }

  const { type, payload } = action;

  switch (type) {
    case ADD_AUTHOR:
      return {
        authors: [...state.authors, payload],
      };
    case DELETE_AUTHOR:
      return {
        courses: [...state.authors].filter((author) => author.id !== payload),
      };
    default:
      return state;
  }
};

export default authorsReducer;
