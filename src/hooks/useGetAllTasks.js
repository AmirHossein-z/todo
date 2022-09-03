import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const useGetAllTasks = () => {
    const [tasks, settasks] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getTasks();
                settasks(data);
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false);
            }
        };
        fetchData();
    }, []);
    return [loading, tasks];
};

export default useGetAllTasks;
