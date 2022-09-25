import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const filterTasksByTag = (tasks, tagId) => {
    let result = [];
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].tags.length; j++) {
            if (tasks[i].tags[j].id === tagId) {
                result.push(tasks[i]);
            }
        }
    }
    return result;
};

const useGetAllTags = (tagId) => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data, status } = await getTasks();
                if (status === 200) {
                    setTasks(data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredTasks = filterTasksByTag(tasks, tagId);

    return [loading, filteredTasks];
};

export default useGetAllTags;
