import axios from "axios";

const URL = "http://localhost:2000";

/**
 * @description get all tasks from url
 * @route GET http://localhost:2000/tasks
 */
export const getTasks = () => {
    const url = `${URL}/tasks`;
    return axios.get(url);
};

/**
 * @description get task from url with taskId provided
 * @route GET http://localhost:2000/tasks/taskId
 */
export const getTask = (taskId, pathname) => {
    let url;
    if (pathname === `/tasks/${taskId}`) url = `${URL}/tasks/${taskId}`;
    else url = `${URL}/completedTasks/${taskId}`;
    return axios.get(url);
};

/**
 * @description get all completed tasks from url
 * @route GET http://localhost:2000/completedTasks
 */
export const getCompletedTasks = () => {
    const url = `${URL}/completedTasks`;
    return axios.get(url);
};

/**
 * @description create a task
 * @route POST http://localhost:2000/tasks
 */
export const createTask = (task) => {
    const url = `${URL}/tasks`;
    return axios.post(url, task);
};

/**
 * @description create the completed task
 * @route POST http://localhost:2000/completedTasks
 */
export const addCompletedTask = (task) => {
    const url = `${URL}/completedTasks`;
    return axios.post(url, task);
};

/**
 * @description update a task with task and taskId provided
 * @route PUT http://localhost:2000/tasks/taskId
 */
export const updateTask = (task, taskId, taskStatus) => {
    let url;
    if (!taskStatus) url = `${URL}/tasks/${taskId}`;
    else url = `${URL}/completedTasks/${taskId}`;
    return axios.put(url, task);
};

/**
 * @description delete a task with taskId provided
 * @route DELETE http://localhost:2000/tasks/taskId
 */
export const deleteTask = (taskId, pathname) => {
    let url;
    if (pathname === `/tasks/${taskId}`) url = `${URL}/tasks/${taskId}`;
    else url = `${URL}/completedTasks/${taskId}`;
    return axios.delete(url);
};
