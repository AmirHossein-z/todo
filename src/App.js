import { Navigate, Route, Routes } from "react-router-dom";
import { Tasks } from "./components/Tasks";
import { Header } from "./components/Header";
import { AddTask } from "./components/AddTask";
import { useEffect, useState } from "react";

const App = () => {
    const [showAddPage, setShowAddPage] = useState(false);
    return (
        <>
            <Header showAddPage={showAddPage} setShowAddPage={setShowAddPage} />
            <Routes>
                <Route path="/" element={<Navigate to={"/tasks"} />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/add" element={<AddTask />} />
            </Routes>
        </>
    );
};

export default App;
