import { ADD_AUTHOR, ADD_AUTHORS, DELETE_AUTHOR } from './actionTypes';

export const addAuthor = (author) => ({
	type: ADD_AUTHOR,
	payload: author,
});

export const addAuthors = (authors) => ({
	type: ADD_AUTHORS,
	payload: authors,
});

export const deleteAuthor = (authorId) => ({
	type: DELETE_AUTHOR,
	payload: authorId,
});
