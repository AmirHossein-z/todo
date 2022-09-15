import { useEffect, useState } from "react";
import { getCompletedTasks } from "../services/taskService";

/**
 * @description a customhook for getting all completed tasks
 * @return loading & tasks states
 */
const useGetAllCompletedTasks = (setLoading) => {
    const [completedTasks, setCompletedTasks] = useState([]);

    // get All tasks info and update tasks state in mounting stage
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await getCompletedTasks();
                setCompletedTasks(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return [completedTasks, setCompletedTasks];
};

export default useGetAllCompletedTasks;
