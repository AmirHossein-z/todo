import { useNavigate } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, changeTaskState }) => {
    const navigate = useNavigate();

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    className="flex justify-between items-center text-customText shadow-[9px_7px_17px_rgba(0,0,0,0.5)] rounded-2xl p-2 sm:p-2.5 transition-transform duration-100 ease-in active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] fade-in-from-bottom cursor-pointer"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="flex items-center gap-x-3">
                        <button
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-customText"
                            onClick={() => {
                                changeTaskState(task);
                            }}
                        ></button>
                        <h3 className="text-base md:text-lg mr-8">
                            {task.title}
                        </h3>
                    </div>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer mr-1"
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
            )}
        </Draggable>
    );
};

export default Task;
