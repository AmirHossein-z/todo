import { useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, deleteTask } from "../../services/taskService";
import EditTask from "./EditTask";
import Loading from "../Loading";
import NotFound from "../NotFound";
import TagTicket from "../Tag/TagTicket";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillWarning } from "react-icons/ai";
import { motion } from "framer-motion";

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
    const [showEditTask, setShowEditTask] = useState(false);
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
                setTask({ errorOccured: true });
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
                    <div className="grid bg-gray-900 p-3 px-5 rounded-lg gap-y-5">
                        <div className="flex justify-center">
                            <AiFillWarning className="w-16 h-16 text-yellow-500 text-center" />
                        </div>
                        <p className="text-red-500 font-semibold text-center my-2">
                            This note will permamently deleted!!
                        </p>
                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                className="transition-all duration-300 focus:outline-none text-white bg-green-700 hover:bg-green-800 font-semibold rounded-lg text-base px-5 py-2.5"
                                onClick={() => onClose()}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="transition-all duration-300 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-semibold rounded-lg text-base px-5 py-2.5"
                                onClick={() => {
                                    removeTask();
                                    onClose();
                                }}
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

    if (loading) {
        return <Loading />;
    } else if (task.errorOccured) {
        return <NotFound />;
    } else if (showEditTask) {
        return (
            <EditTask
                task={task}
                setTask={setTask}
                setLoading={setLoading}
                taskId={taskId}
                tasks={tasks}
                setTasks={setTasks}
                setViewState={setShowEditTask}
                completedTasks={completedTasks}
                setCompletedTasks={setCompletedTasks}
                tags={tags}
                setTags={setTags}
            />
        );
    }

    return (
        <motion.main
            className="my-5 p-5 transition-all duration-700 ease-in md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl m-auto"
            ref={viewRef}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "linear" }}
        >
            <div className="text-lg flex justify-between items-center">
                <h1 className="text-customText text-lg sm:text-xl font-bold">
                    {task.title}
                </h1>
                <div>
                    <div className="flex gap-x-5">
                        <span
                            onClick={confirmDelete}
                            className="cursor-pointer flex gap-x-1 items-center text-red-500 hover:text-red-700 active:text-red-700 transition-all duration-300"
                        >
                            <RiDeleteBin6Line className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5" />
                            <span className="lg:text-lg font-semibold hidden md:block md:text-sm">
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
                                    setShowEditTask(true);
                                }, 700);
                            }}
                            className="cursor-pointer flex gap-x-1 items-center text-yellow-500 active:text-yellow-700 hover:text-yellow-700 transition-all duration-300"
                        >
                            <FiEdit className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5" />
                            <span className="lg:text-lg font-semibold hidden md:block md:text-sm">
                                Edit
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="my-4 sm:my-4 md:my-3 bg-customText bg-opacity-10 w-full h-0.5 rounded-lg"></div>
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
        </motion.main>
    );
};

export default ViewTask;
