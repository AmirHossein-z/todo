import { Navigate, Route, Routes } from "react-router-dom";
import { Tasks } from "./components/Tasks";
import { Header } from "./components/Header";
import { AddTask } from "./components/AddTask";
import { useState } from "react";
import useGetAllTasks from "./hooks/useGetAllTasks";

const App = () => {
    const [loading, setLoading, tasks, setTasks] = useGetAllTasks();
    const [task, setTask] = useState({});
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to={"/tasks"} />} />
                <Route
                    path="/tasks"
                    element={<Tasks tasks={tasks} loading={loading} />}
                />
                <Route
                    path="/tasks/add"
                    element={
                        <AddTask
                            task={task}
                            setTask={setTask}
                            loading={loading}
                            setLoading={setLoading}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default App;
