// components
import { Tasks } from "./components/Tasks";
import Header from "./components/Header";
import { AddTask } from "./components/AddTask";
import useGetAllTasks from "./hooks/useGetAllTasks";
import { ViewTask } from "./components/ViewTask";
import { Tags } from "./components/Tags";

import useGetAllCompletedTasks from "./hooks/useGetAllCompletedTasks";
import {
    addCompletedTask,
    createTask,
    deleteTask,
} from "./services/taskService";

import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Navigate, Route, Routes } from "react-router-dom";
import { Tag } from "./components/Tag";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [dropShowBox, setDropShowBox] = useState({
        state: false,
        droppableId: null,
    });
    const [tasks, setTasks] = useGetAllTasks(setLoading);
    const [completedTasks, setCompletedTasks] =
        useGetAllCompletedTasks(setLoading);

    // toggle task status whenever a task is clicked
    const changeTaskState = async (task) => {
        try {
            const prevTask = task;
            let result;
            if (prevTask.status) {
                result = await deleteTask(
                    task.id,
                    `/completedTasks/${task.id}`
                );
            } else {
                result = await deleteTask(task.id, `/tasks/${task.id}`);
            }
            if (result.status === 200) {
                if (prevTask.status) {
                    // delete from completed tasks
                    const prevCompletedTasks = [...completedTasks];
                    let index = prevCompletedTasks.findIndex(
                        (item) => item.id === task.id
                    );
                    prevCompletedTasks.splice(index, 1);
                    setCompletedTasks([...prevCompletedTasks]);

                    // add to tasks
                    setTasks([
                        ...tasks,
                        { ...prevTask, status: !prevTask.status },
                    ]);
                    await createTask({ ...prevTask, status: !prevTask.status });
                } else {
                    // delete from tasks
                    const prevTasks = [...tasks];
                    let taskIndex = prevTasks.findIndex(
                        (item) => item.id === task.id
                    );
                    prevTasks.splice(taskIndex, 1);

                    // add to completed tasks
                    setTasks([...prevTasks]);
                    setCompletedTasks([
                        ...completedTasks,
                        { ...prevTask, status: !prevTask.status },
                    ]);
                    await addCompletedTask({
                        ...prevTask,
                        status: !prevTask.status,
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onDragEnd = (result) => {
        setDropShowBox({ state: false, droppableId: null });
        const { destination, source } = result;

        if (!destination) return;

        if (source.droppableId === "2" && destination.droppableId === "1") {
            changeTaskState(completedTasks[source.index]);
        }

        if (source.droppableId === "1" && destination.droppableId === "2") {
            changeTaskState(tasks[source.index]);
        }
    };

    const onDragStart = (start) => {
        const { source } = start;
        setDropShowBox({ state: true, droppableId: source.droppableId });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to={"/tasks"} />} />
                <Route
                    path="/tasks"
                    element={
                        <Tasks
                            tasks={tasks}
                            setTasks={setTasks}
                            loading={loading}
                            completedTasks={completedTasks}
                            setCompletedTasks={setCompletedTasks}
                            changeTaskState={changeTaskState}
                            dropShowBox={dropShowBox}
                        />
                    }
                />
                <Route
                    path="/tasks/add"
                    element={
                        <AddTask
                            loading={loading}
                            setLoading={setLoading}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    }
                />
                <Route
                    path="/tasks/:taskId"
                    element={
                        <ViewTask
                            setLoading={setLoading}
                            loading={loading}
                            tasks={tasks}
                            setTasks={setTasks}
                            completedTasks={completedTasks}
                            setCompletedTasks={setCompletedTasks}
                        />
                    }
                />
                <Route
                    path="/completed-tasks/:taskId"
                    element={
                        <ViewTask
                            setLoading={setLoading}
                            loading={loading}
                            tasks={tasks}
                            setTasks={setTasks}
                            completedTasks={completedTasks}
                            setCompletedTasks={setCompletedTasks}
                        />
                    }
                />
                <Route
                    path="/tasks/tags"
                    element={
                        <Tags tasks={tasks} completedTasks={completedTasks} />
                    }
                />
                <Route path="/tasks/tags/:tagId" element={<Tag />} />
            </Routes>
        </DragDropContext>
    );
};

export default App;
