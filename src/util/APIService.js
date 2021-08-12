import axios from "axios";
import { BACKEND_URL } from "./consts";

export default class APIService {
  static url = BACKEND_URL;

  static Get(endpoint, token = "") {
    return axios
      .get(`${this.url + endpoint}`, { headers: { Authorization: token } })
      .then((res) => (res.data ? res.data.result : res.result))
      .catch((err) => err);
  }

  static Get(endpoint, queries = {}, token = "") {
    return axios
      .get(
        `${this.url + endpoint}`,
        queries ? { params: queries } : {},
        token ? { headers: { Authorization: token } } : {}
      )
      .then((res) => (res.data ? res.data.result : res.result))
      .catch((err) => err);
  }

  static Post(endpoint, rawdata = {}, token = "") {
    return new Promise((resolve, reject) => {
      try {
        axios({
          method: "post",
          url: `${this.url + endpoint}`,
          data: rawdata,
          headers: { Authorization: token },
        })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch {
        const response = "failed to post";
        reject(response);
      }
    });
  }

  static DELETE(endpoint, specifier = "", token = "") {
    return new Promise((resolve, reject) => {
      try {
        axios({
          method: "delete",
          url: `${`${this.url + endpoint}/${specifier}`}`,
          headers: { Authorization: token },
        })
          .then((res) => resolve(res.data))
          .catch((err) => {
            reject(err);
          });
      } catch {
        const response = "failed to delete";
        reject(response);
      }
    });
  }
}
