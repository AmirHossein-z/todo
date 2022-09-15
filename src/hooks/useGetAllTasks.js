import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

/**
 * @description a customhook for getting all tasks
 * @return loading & tasks states
 */
const useGetAllTasks = (setLoading) => {
    const [tasks, setTasks] = useState([]);

    // get All tasks info and update tasks state in mounting stage
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data, status } = await getTasks();
                if (status === 200) setTasks(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return [tasks, setTasks];
};

export default useGetAllTasks;
