import { useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, deleteTask } from "../../services/taskService";
import EditTask from "./EditTask";
import Loading from "../Loading";
import TagTicket from "../Tag/TagTicket";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillWarning } from "react-icons/ai";

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
    const [task, setTask] = useState({});
    const viewRef = useRef(null);
    const [viewState, setViewState] = useState(true);
    const [tags, setTags] = useState([]);

    // get task info and update task state in mounting stage
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { status, data } = await getTask(taskId);
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
                            <AiFillWarning className="w-14 h-14 text-yellow-500 text-center" />
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
            const { status } = await deleteTask(taskId);
            if (status === 200) {
                toast.error("Task was deleted !");
                if (task.status) {
                    const prevTasks = [...completedTasks];
                    const taskIndex = completedTasks.findIndex(
                        (item) => item.id === parseInt(taskId)
                    );
                    prevTasks.splice(taskIndex, 1);
                    setCompletedTasks(prevTasks);
                } else {
                    const prevTasks = [...tasks];
                    const taskIndex = tasks.findIndex(
                        (item) => item.id === parseInt(taskId)
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
                            <div className="flex gap-x-3">
                                <span
                                    onClick={confirmDelete}
                                    className="cursor-pointer"
                                >
                                    <RiDeleteBin6Line className="w-5 h-5 sm:w-6 sm:h-6 md:hidden text-red-500 active:text-red-700" />
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
                                    <FiEdit className="w-5 h-5 sm:w-6 sm:h-6 md:hidden text-yellow-500 active:text-yellow-700" />
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