import APIService from "../../util/APIService";
import { ENDPOINTS } from "../../util/consts";
import { addAuthor, addAuthors, deleteAuthor } from "./actionCreators";

export const getAllAuthors = () => (dispatch) =>
  APIService.Get(ENDPOINTS.GET_ALL_AUTHORS)
    .then((authors) => dispatch(addAuthors(authors)))
    .catch((err) => {
      // eslint-disable-next-line no-alert
      alert("you are not logged in as admin");
    });

export const postAuthor = (authData, token) => (dispatch) => {
  APIService.Post(ENDPOINTS.POST_ADD_AUTHOR, authData, token)
    .then((res) => {
      dispatch(addAuthor({ name: authData.name, id: res.result.id }));
    })
    .catch((err) => {
      // eslint-disable-next-line no-alert
      alert("you are not logged in as admin");
    });
};

export const postDeleteAuthor = (authId, token) => (dispatch) => {
  APIService.Delete(ENDPOINTS.DELETE_AUTHOR_BY_ID, authId, token)
    .then((res) => {
      if (res.successful) dispatch(deleteAuthor(authId));
    })
    .catch((err) => {
      // eslint-disable-next-line no-alert
      alert("you are not logged in as admin");
    });
};
