import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, deleteTask } from "../services/taskService";
import { EditTask } from "./EditTask";
import { Loading } from "./Loading";

export const ViewTask = ({ loading, setLoading, tasks, setTasks }) => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});
    const viewRef = useRef(null);
    const [viewState, setViewState] = useState(true);

    // get task info and update task state in mounting stage
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, status } = await getTask(taskId);
                if (status === 200) {
                    setTask(data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // remove task and navigate to main page
    const removeTask = async () => {
        if (
            window.confirm("Are you sure? this note will permamently deleted!!")
        ) {
            setLoading(true);
            try {
                const { status } = await deleteTask(taskId);
                if (status === 200) {
                    const prevTasks = [...tasks];
                    const taskIndex = tasks.findIndex(
                        (item) => item.id === taskId
                    );
                    prevTasks.splice(taskIndex, 1);
                    setTasks(prevTasks);
                    navigate("/tasks");
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : viewState ? (
                <main
                    className="my-5 p-5 transition-all duration-700 ease-in fade-in-from-bottom"
                    ref={viewRef}
                >
                    <div className="text-lg flex justify-between items-center">
                        <h1 className="text-customText text-lg font-bold">
                            {task.title}
                        </h1>
                        <div>
                            <div className="flex gap-x-3">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5 text-red-500 active:text-red-700 cursor-pointer"
                                        onClick={removeTask}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5 text-yellow-500 cursor-pointer"
                                        onClick={() => {
                                            viewRef.current.classList.add(
                                                "translate-x-52",
                                                "opacity-0"
                                            );
                                            setTimeout(() => {
                                                setViewState(false);
                                            }, 800);
                                        }}
                                    >
                                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="my-5 bg-customText bg-opacity-20 w-full h-0.5 rounded"></div>
                    <div className="text-customText text-base">
                        <p>{task.body}</p>
                    </div>
                </main>
            ) : (
                <EditTask
                    task={task}
                    setTask={setTask}
                    setLoading={setLoading}
                    taskId={taskId}
                    tasks={tasks}
                    setTasks={setTasks}
                    setViewState={setViewState}
                />
            )}
        </>
    );
};
