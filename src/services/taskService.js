import axios from "axios";

const URL = "http://localhost:2000";

export const getTasks = () => {
    const url = `${URL}/tasks`;
    return axios.get(url);
};

export const getTask = (taskId) => {
    const url = `${URL}/tasks/${taskId}`;
    return axios.get(url);
};

export const createTask = (task) => {
    const url = `${URL}/tasks`;
    task = { ...task, status: false };
    return axios.post(url, task);
};

export const updateTask = (task, taskId) => {
    const url = `${URL}/tasks/${taskId}`;
    return axios.put(url, task);
};

export const deleteTask = (taskId) => {
    const url = `${URL}/tasks/${taskId}`;
    return axios.delete(url);
};
