import axios from "axios";

const URL = "https://my-json-server.typicode.com/AmirHossein-z/todo-server";

/**
 * @description get all tasks from url
 * @route GET URl/tasks
 */
export const getTasks = () => {
    const url = `${URL}/tasks`;
    return axios.get(url);
};

/**
 * @description get task from url with taskId provided
 * @route GET URL/tasks/taskId
 */
export const getTask = (taskId) => {
    const url = `${URL}/tasks/${taskId}`;
    return axios.get(url);
};

/**
 * @description create a task
 * @route POST URL/tasks
 */
export const createTask = (task) => {
    const url = `${URL}/tasks`;
    return axios.post(url, task);
};

/**
 * @description update a task with task and taskId provided
 * @route PUT URL/tasks/taskId
 */
export const updateTask = (task, taskId) => {
    const url = `${URL}/tasks/${taskId}`;
    return axios.put(url, task);
};

/**
 * @description delete a task with taskId provided
 * @route DELETE URL/tasks/taskId
 */
export const deleteTask = (taskId) => {
    const url = `${URL}/tasks/${taskId}`;
    return axios.delete(url);
};
