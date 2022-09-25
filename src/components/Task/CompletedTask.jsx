import { Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";

const CompletedTask = ({ task, index, changeTaskState }) => {
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
                        <HiBadgeCheck
                            onClick={() => {
                                changeTaskState(task);
                            }}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <h3 className="text-base md:text-lg mr-8">
                            {task.title}
                        </h3>
                    </div>
                    <div className="p-1">
                        <AiFillEye
                            className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                            onClick={() => {
                                navigate(`/completed-tasks/${task.id}`);
                            }}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default CompletedTask;
