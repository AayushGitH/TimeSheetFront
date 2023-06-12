import axios from 'axios';
import base_url from '../api/apiurl';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

// API calls for employees
export const addEmployeeapi = (data) => {
    return axios.post(`${base_url}/admin/addEmployee`, data,{headers:headers});
}

export const getEmployeesapi = () => {
    return axios.get(`${base_url}/admin/getEmployees`,{headers:headers});
}

export const updateEmployeesapi = (data) => {
    return axios.patch(`${base_url}/admin/updateEmployee`,data,{headers:headers});
}

// API calls for projects
export const addProjectapi = (data) => {
    return axios.post(`${base_url}/admin/addProject`, data,{headers:headers});
}

export const getProjectsapi = () => {
    return axios.get(`${base_url}/admin/readAllProjects`,{headers:headers});
}

export const updateProjectapi = (data) => {
    return axios.patch(`${base_url}/admin/updateProject`,data,{headers:headers});
}

// API calls for clients
export const getClientsapi = () => {
    return axios.get(`${base_url}/admin/readAllClients`,{headers:headers});
}

export const addClientapi = (data) => {
    return axios.post(`${base_url}/admin/addClient`, data,{headers:headers});
}

export const updateClientapi = (data) => {
    return axios.patch(`${base_url}/admin/updateClient`,data,{headers:headers});
}

// API calls for holidays
export const getHolidaysapi = () => {
    return axios.get(`${base_url}/admin/readAllHolidays`,{headers:headers});
}

export const addHolidayapi = (data) => {
    return axios.post(`${base_url}/admin/addHoliday`, data,{headers:headers});
}

export const updatedHolidayapi = (data) => {
    return axios.patch(`${base_url}/admin/updateHoliday`,data,{headers:headers});
}