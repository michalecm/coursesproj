import { ADD_AUTHOR, ADD_AUTHORS, DELETE_AUTHOR } from "./actionTypes";

const authorsInitialState = {
  authors: [], /// default value - empty array. After success getting courses from API - array of courses.
  // See Swagger `/courses/all`.
  isLoading: true,
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
        isLoading: false,
      };
    case ADD_AUTHORS:
      return {
        authors: [...state.authors, ...payload],
        isLoading: false,
      };
    case DELETE_AUTHOR:
      return {
        authors: [...state.authors].filter((author) => author.id !== payload),
      };
    default:
      return state;
  }
};

export default authorsReducer;
