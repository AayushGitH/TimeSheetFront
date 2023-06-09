import axios from 'axios';
import base_url from '../api/apiurl';

// Home api calls
export const signupapi = (data) => {
    return axios.post(`${base_url}/home/save`, data);
}

export const loginapi = (data) => {
    return axios.post(`${base_url}/home/authenticate`,data);
}

export const getUserapi = () => {
    return axios.post(`${base_url}/home/details`,localStorage.getItem('token'));
}