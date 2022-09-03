import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const useGetAllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

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
