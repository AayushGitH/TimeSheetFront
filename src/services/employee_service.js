import axios from 'axios';
import base_url from '../api/apiurl';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

// API calls for timesheets
export const addTimeSheetapi = (data) => {
    return axios.post(`${base_url}/timesheet/addTimeSheet`, data,{headers:headers});
}

export const getTimesheetsapi = () => {
    return axios.get(`${base_url}/timesheet/readTimeSheets`,{headers:headers});
}

export const updateTimeSheetapi = (data) => {
    return axios.patch(`${base_url}/timesheet/updateTimeSheet`,data,{headers:headers});
}
