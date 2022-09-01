import axios from "axios";

const URL = "http://localhost:2000";

export const getTasks = () => {
    const url = `${URL}/tasks`;
    return axios.get(url);
};
