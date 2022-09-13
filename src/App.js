import { Navigate, Route, Routes } from "react-router-dom";
import { Tasks } from "./components/Tasks";
import Header from "./components/Header";
import { AddTask } from "./components/AddTask";
import useGetAllTasks from "./hooks/useGetAllTasks";
import { ViewTask } from "./components/ViewTask";

const App = () => {
    const [
        loading,
        setLoading,
        tasks,
        setTasks,
        completedTasks,
        setCompletedTasks,
    ] = useGetAllTasks();

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
                            completedTasks={completedTasks}
                            setCompletedTasks={setCompletedTasks}
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
            </Routes>
        </>
    );
};

export default App;
