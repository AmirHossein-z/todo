import { Navigate, Route, Routes } from "react-router-dom";
import { Tasks } from "./components/Tasks";
import Header from "./components/Header";
import { AddTask } from "./components/AddTask";
import { useState } from "react";
import useGetAllTasks from "./hooks/useGetAllTasks";
import { ViewTask } from "./components/ViewTask";

const App = () => {
    const [loading, setLoading, tasks, setTasks] = useGetAllTasks();

    return (
        <>
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
                        <ViewTask setLoading={setLoading} loading={loading} />
                    }
                />
            </Routes>
        </>
    );
};

export default App;
