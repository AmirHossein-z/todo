import { useNavigate } from "react-router-dom";
import { updateTask } from "../services/taskService";

export const Task = ({ task, tasks, setTasks }) => {
    const navigate = useNavigate();

    const changeTaskState = async () => {
        try {
            const { data, status: requestStatus } = await updateTask(
                {
                    ...task,
                    status: !task.status,
                },
                task.id
            );
            if (requestStatus === 200) {
                const prevTasks = [...tasks];
                let taskIndex = tasks.findIndex((item) => item.id === task.id);
                prevTasks[taskIndex] = data;
                setTasks([...prevTasks]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-between items-center text-customText shadow-[9px_7px_17px_rgba(0,0,0,0.5)] rounded-2xl p-3 transition-transform duration-100 ease-in active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] active:translate-y-1 fade-in-from-bottom">
            <div className="flex items-center gap-x-3">
                {task.status ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                        onClick={changeTaskState}
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <button
                        className="w-4 h-4 rounded-full border-2 border-customText"
                        onClick={changeTaskState}
                    ></button>
                )}
                <h3 className="text-base mr-8">{task.title}</h3>
            </div>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                        navigate(`/tasks/${task.id}`);
                    }}
                >
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
};
