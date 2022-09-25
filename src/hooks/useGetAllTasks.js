import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

/**
 * @description a customhook for getting all tasks
 * @return loading & tasks states
 */
const useGetAllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    // get All tasks info and update tasks state in mounting stage
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data, status } = await getTasks();
                if (status === 200) {
                    setCompletedTasks(data.filter((task) => task.status));
                    setTasks(data.filter((task) => !task.status));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return [
        tasks,
        setTasks,
        completedTasks,
        setCompletedTasks,
        loading,
        setLoading,
    ];
};

export default useGetAllTasks;
