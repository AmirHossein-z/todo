import { useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTask, deleteTask } from "../../services/taskService";
import EditTask from "./EditTask";
import Loading from "../Loading";
import TagTicket from "../Tag/TagTicket";

const ViewTask = ({
    loading,
    setLoading,
    tasks,
    setTasks,
    completedTasks,
    setCompletedTasks,
}) => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [task, setTask] = useState({});
    const viewRef = useRef(null);
    const [viewState, setViewState] = useState(true);
    const [tags, setTags] = useState([]);

    // get task info and update task state in mounting stage
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { status, data } = await getTask(
                    taskId,
                    location.pathname
                );
                if (status === 200) {
                    setTask(data);
                    setTags(data.tags);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const confirmDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="grid bg-slate-800 p-3 px-5 rounded gap-y-5">
                        <div className="flex justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-10 h-10 text-yellow-500 text-center"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <p className="text-red-500 font-bold text-center my-2">
                            this note will permamently deleted!!
                        </p>
                        <div className="flex justify-between items-center">
                            <button
                                className="text-black bg-[#66bb6a] py-2 px-3 rounded"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    removeTask();
                                    onClose();
                                }}
                                className="text-white bg-[#d33] py-2 px-3 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };

    // remove task and navigate to main page
    const removeTask = async () => {
        setLoading(true);
        try {
            const { status } = await deleteTask(taskId, location.pathname);
            if (status === 200) {
                if (task.status) {
                    const prevTasks = [...completedTasks];
                    const taskIndex = completedTasks.findIndex(
                        (item) => item.id === taskId
                    );
                    prevTasks.splice(taskIndex, 1);
                    setCompletedTasks(prevTasks);
                } else {
                    const prevTasks = [...tasks];
                    const taskIndex = tasks.findIndex(
                        (item) => item.id === taskId
                    );
                    prevTasks.splice(taskIndex, 1);
                    setTasks(prevTasks);
                }
                navigate("/tasks");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : viewState ? (
                <main
                    className="my-5 p-5 transition-all duration-700 ease-in fade-in-from-bottom md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl m-auto"
                    ref={viewRef}
                >
                    <div className="text-lg flex justify-between items-center">
                        <h1 className="text-customText text-lg sm:text-xl font-bold">
                            {task.title}
                        </h1>
                        <div>
                            <div className="flex gap-x-4">
                                <span
                                    onClick={confirmDelete}
                                    className="cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5 sm:w-6 sm:h-6 md:hidden text-red-500 active:text-red-700"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-red-500 active:text-red-700 hover:text-red-700 lg:text-lg font-bold hidden md:block">
                                        Delete
                                    </span>
                                </span>
                                <span
                                    onClick={() => {
                                        viewRef.current.classList.add(
                                            "translate-x-32",
                                            "opacity-0"
                                        );
                                        setTimeout(() => {
                                            setViewState(false);
                                        }, 700);
                                    }}
                                    className="cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5 sm:w-6 sm:h-6 md:hidden text-yellow-500 active:text-yellow-700"
                                    >
                                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                    </svg>
                                    <span className="text-yellow-500 active:text-yellow-700 hover:text-yellow-700 lg:text-lg font-bold hidden md:block">
                                        Edit
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="my-5 sm:my-4 md:my-3  bg-customText bg-opacity-20 w-full h-0.5 rounded"></div>
                    <div className="text-customText text-sm sm:text-base break-words m-0 p-1 sm:p-1.5">
                        <p>{task.body}</p>
                    </div>
                    <div className="mt-5">
                        <h2 className="text-customText text-base sm:text-lg mb-3">
                            Tags
                        </h2>
                        <div className="text-sm sm:text-base flex gap-x-6">
                            {tags
                                ? tags.map((tag) => (
                                      <TagTicket key={tag.id} text={tag.text} />
                                  ))
                                : null}
                        </div>
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
                    completedTasks={completedTasks}
                    setCompletedTasks={setCompletedTasks}
                    tags={tags}
                    setTags={setTags}
                />
            )}
        </>
    );
};

export default ViewTask;
