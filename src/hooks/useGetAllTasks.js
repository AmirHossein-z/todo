import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const useGetAllTasks = () => {
    const [tasks, settasks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTasks();
            settasks(data);
        };
        fetchData();
    }, []);
    return tasks;
};

export default useGetAllTasks;
