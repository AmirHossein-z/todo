import { updateTask } from "./services/taskService";

import { lazy, Suspense, useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Navigate, Route, Routes } from "react-router-dom";
import { Zoom, ToastContainer, toast } from "react-toastify";

//hooks
import useGetAllTasks from "./hooks/useGetAllTasks";

// components
import { Header, Tasks, Loading } from "./components";
const AddTask = lazy(() => import("./components/Task/AddTask"));
const TagsList = lazy(() => import("./components/Tag/TagsList"));
const Tag = lazy(() => import("./components/Tag/Tag"));
const ViewTask = lazy(() => import("./components/Task/ViewTask"));
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
    const [dropShowBox, setDropShowBox] = useState({
        state: false,
        droppableId: null,
    });
    const [
        tasks,
        setTasks,
        completedTasks,
        setCompletedTasks,
        loading,
        setLoading,
    ] = useGetAllTasks();

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
            const result = await updateTask(
                { ...task, status: !task.status },
                task.id
            );
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
                    setTasks([...tasks, { ...prevTask, status: false }]);
                } else {
                    // delete from tasks
                    const prevTasks = [...tasks];
                    let taskIndex = prevTasks.findIndex(
                        (item) => item.id === task.id
                    );
                    prevTasks.splice(taskIndex, 1);
                    setTasks([...prevTasks]);

                    // add to completed tasks
                    setCompletedTasks([
                        ...completedTasks,
                        { ...prevTask, status: true },
                    ]);
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
            <ToastContainer
                newestOnTop={true}
                transition={Zoom}
                theme="colored"
            />
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
                        <Suspense fallback={<Loading />}>
                            <AddTask
                                loading={loading}
                                setLoading={setLoading}
                                tasks={tasks}
                                setTasks={setTasks}
                            />
                        </Suspense>
                    }
                />
                <Route
                    path="/tasks/:taskId"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ViewTask
                                setLoading={setLoading}
                                loading={loading}
                                tasks={tasks}
                                setTasks={setTasks}
                                completedTasks={completedTasks}
                                setCompletedTasks={setCompletedTasks}
                            />
                        </Suspense>
                    }
                />
                <Route
                    path="/tasks/tags"
                    element={
                        <Suspense fallback={<Loading />}>
                            <TagsList
                                tasks={tasks}
                                completedTasks={completedTasks}
                            />
                        </Suspense>
                    }
                />
                <Route
                    path="/tasks/tags/:tagId"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Tag />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<Loading />}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
        </DragDropContext>
    );
};

export default App;
