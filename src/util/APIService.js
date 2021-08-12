import axios from 'axios';
import { BACKEND_URL } from './consts';

export default class APIService {
	static url = BACKEND_URL;

	static Get(endpoint, queries = {}, token = '') {
		const config = {
			params: queries,
			headers: { Authorization: token },
		};
		return axios
			.get(`${this.url + endpoint}`, config)
			.then((res) => (res.data ? res.data.result : res.result))
			.catch((err) => err);
	}

	static Post(endpoint, rawdata = {}, token = '') {
		return axios({
			method: 'post',
			url: `${this.url + endpoint}`,
			data: rawdata,
			headers: { Authorization: token },
		})
			.then((res) => res.data)
			.catch((err) => err);
	}

	static Put(endpoint, rawdata = {}, token = '') {
		return axios({
			method: 'put',
			url: `${this.url + endpoint}`,
			data: rawdata,
			headers: { Authorization: token },
		})
			.then((res) => res.data)
			.catch((err) => err);
	}

	static DELETE(endpoint, specifier = '', token = '') {
		return axios({
			method: 'delete',
			url: `${`${this.url + endpoint}/${specifier}`}`,
			headers: { Authorization: token },
		})
			.then((res) => res.data)
			.catch((err) => err);
	}
}
