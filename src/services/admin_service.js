import axios from 'axios';
import base_url from '../api/apiurl';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

// API calls for employees
export const addEmployeeapi = (data) => {
    return axios.post(`${base_url}/employee/addEmployee`, data, { headers: headers }); // Done
}

export const getEmployeesapi = () => {
    return axios.get(`${base_url}/employee/getEmployees`, { headers: headers }); // Done
}

export const updateEmployeesapi = (data) => {
    return axios.patch(`${base_url}/employee/updateEmployee`, data, { headers: headers }); // Done
}

// API calls for projects
export const addProjectapi = (data) => {
    return axios.post(`${base_url}/project/addProject`, data, { headers: headers }); // Done
}

export const getProjectsapi = () => {
    return axios.get(`${base_url}/project/readAllProjects`, { headers: headers }); // Done
}

export const getProjectByIdapi = (projectId) => {
    return axios.get(`${base_url}/project/readProject/${projectId}`, { headers: headers }); // Done
}

export const updateProjectapi = (data) => {
    return axios.patch(`${base_url}/project/updateProject`, data, { headers: headers }); // Done
}

export const assignProjectapi = (data) => {
    return axios.post(`${base_url}/project/assignProject`, data, { headers: headers }); // Done
}

// API calls for clients
export const getClientsapi = () => {
    return axios.get(`${base_url}/client/readAllClients`, { headers: headers }); // Done
}

export const addClientapi = (data) => {
    return axios.post(`${base_url}/client/addClient`, data, { headers: headers }); // Done
} 

export const updateClientapi = (data) => {
    return axios.patch(`${base_url}/client/updateClient`, data, { headers: headers }); // Done
}

export const mapClientapi = (data) => {
    return axios.post(`${base_url}/client/assignClient`, data, { headers: headers }); // Done
}

// API calls for holidays
export const getHolidaysapi = () => {
    return axios.get(`${base_url}/holiday/readAllHolidays`, { headers: headers }); // Done
}

export const addHolidayapi = (data) => {
    return axios.post(`${base_url}/holiday/addHoliday`, data, { headers: headers }); // Done
}

export const updatedHolidayapi = (data) => {
    return axios.patch(`${base_url}/holiday/updateHoliday`, data, { headers: headers }); // Done
}

// API calls for graph