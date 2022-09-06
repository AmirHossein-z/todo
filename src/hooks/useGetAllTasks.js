import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

/**
 * @description a customhook for getting all tasks
 * @return loading & tasks states
 */
const useGetAllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    // get All tasks info and update tasks state in mounting stage
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await getTasks();
                setTasks(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return [loading, setLoading, tasks, setTasks];
};

export default useGetAllTasks;
