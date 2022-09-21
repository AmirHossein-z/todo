import {
    addCompletedTask,
    createTask,
    deleteTask,
} from "./services/taskService";

import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Navigate, Route, Routes } from "react-router-dom";
import { Zoom, ToastContainer, toast } from "react-toastify";

//hooks
import useGetAllCompletedTasks from "./hooks/useGetAllCompletedTasks";
import useGetAllTasks from "./hooks/useGetAllTasks";

// components
import { AddTask, Header, Tag, Tags, Tasks, ViewTask } from "./components";
import { useEffect } from "react";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [dropShowBox, setDropShowBox] = useState({
        state: false,
        droppableId: null,
    });
    const [tasks, setTasks] = useGetAllTasks(setLoading);
    const [completedTasks, setCompletedTasks] =
        useGetAllCompletedTasks(setLoading);

    const checkInternetStatus = async () => {
        if (!window.navigator.onLine) return false;

        // avoid CORS errors with a request to your own origin
        const url = new URL(window.location.origin);

        // random value to prevent cached responses
        url.searchParams.set(
            "rand",
            Math.random().toString(36).substring(2, 15)
        );

        try {
            const response = await fetch(url.toString(), {
                method: "HEAD",
            });

            return response.ok;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        let prevStatus = true;
        const intervalId = setInterval(async () => {
            const status = await checkInternetStatus();

            if (!prevStatus && !status) {
                prevStatus = false;
            } else if (!status) {
                toast.error("You are offline!", {
                    autoClose: false,
                });

                prevStatus = false;
            } else {
                prevStatus = true;
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

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
            <ToastContainer newestOnTop={true} transition={Zoom} theme="dark" />
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
