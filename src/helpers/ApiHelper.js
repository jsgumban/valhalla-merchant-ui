import axios from "axios";
const API_URL = process.env.API_URL || "http://localhost:8080";

const axiosApi = axios.create({
	baseURL: API_URL,
});

const token = localStorage.getItem('accessToken');
axiosApi.defaults.headers.common["Authorization"] = `Bearer ${ token }`;
// axiosApi.defaults.headers.common["Content-type"] = 'application/json';

axiosApi.interceptors.response.use(
	response => response,
	error => Promise.reject(error)
);

export async function get( url, config = {} ) {
	return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post( url, data, config = {} ) {
	return axiosApi
		.post(url, { ...data }, { ...config })
		.then(response => response.data);
}

export async function update( url, data, config = {} ) {
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then(response => response.data);
}

export async function del( url, config = {} ) {
	return await axiosApi
		.delete(url, { ...config })
		.then(response => response.data);
}
