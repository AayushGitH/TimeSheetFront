import axios from 'axios';
import base_url from '../api/apiurl';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

// API calls for timesheets
export const addTimeSheetapi = (data) => {
    return axios.post(`${base_url}/employee/addTimeSheet`, data,{headers:headers});
}

export const getTimesheetsapi = () => {
    return axios.get(`${base_url}/employee/readTimeSheets`,{headers:headers});
}

export const updateTimeSheetapi = (data) => {
    return axios.patch(`${base_url}/employee/updateTimeSheet`,data,{headers:headers});
}
