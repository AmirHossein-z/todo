import useGetAllCompletedTasks from "./useGetAllCompletedTasks";
import useGetAllTasks from "./useGetAllTasks";
import { useState } from "react";

const filterTasksByTag = (completedTasks, tasks, tagId) => {
    let allTasks = [...tasks, ...completedTasks];
    let result = [];
    for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].tags.length; j++) {
            if (allTasks[i].tags[j].id === tagId) {
                result.push(allTasks[i]);
            }
        }
    }
    return result;
};

const useGetAllTags = (tagId) => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useGetAllTasks(setLoading);
    const [completedTasks, setCompletedTasks] =
        useGetAllCompletedTasks(setLoading);

    const result = filterTasksByTag(completedTasks, tasks, tagId);

    return [loading, result];
};

export default useGetAllTags;
