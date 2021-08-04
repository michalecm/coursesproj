import axios from "axios";
import { BACKEND_URL } from "./consts";

export default class APIService {
  constructor() {
    this.url = BACKEND_URL;
    this.data = {};
  }

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
          const response = axios
            .get(`${this.url + endpoint}/?${query}`)
            .then((res) => res.data.result)
            .catch((err) => err);
          resolve(response);
        } catch {
          const response = "failed to get";
          reject(response);
        }
      });
    }
    return new Promise((resolve, reject) => {
      try {
        const response = axios
          .get(`${this.url + endpoint}`)
          .then((res) => res.data.result)
          .catch((err) => err);
        resolve(response);
      } catch {
        const response = "failed to get";
        reject(response);
      }
    });
  }
}
