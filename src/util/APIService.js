import axios from "axios";
import { BACKEND_URL } from "./consts";

export default class APIService {
  static url = BACKEND_URL;

  static data = {};

  static Get(endpoint, queries = {}) {
    if (
      !(
        queries &&
        Object.keys(queries).length === 0 &&
        queries.constructor === Object
      )
    ) {
      return new Promise((resolve, reject) => {
        const payload = Object.assign(this.data, queries);
        const esc = encodeURIComponent;
        const query = Object.keys(payload)
          .map((k) => `${esc(k)}=${esc(payload[k])}`)
          .join("&");
        try {
          axios
            .get(`${this.url + endpoint}/?${query}`)
            .then((res) => resolve(res.data ? res.data.result : res.result))
            .catch((err) => reject(err));
        } catch {
          const response = "failed to get";
          reject(response);
        }
      });
    }
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(`${this.url + endpoint}`)
          .then((res) => resolve(res.data ? res.data.result : res.result))
          .catch((err) => reject(err));
      } catch {
        const response = "failed to get";
        reject(response);
      }
    });
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
