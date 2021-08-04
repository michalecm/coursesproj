import { ADD_AUTHOR, DELETE_AUTHOR } from "./actionTypes";

export const addAuthor = (author) => ({
  type: ADD_AUTHOR,
  payload: [author],
});

export const deleteAuthor = (authorId) => ({
  type: DELETE_AUTHOR,
  payload: authorId,
});
