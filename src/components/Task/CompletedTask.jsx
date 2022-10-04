import { Draggable } from "react-beautiful-dnd";
import { HiBadgeCheck } from "react-icons/hi";
import ViewTaskButton from "./ViewTaskButton";

const CompletedTask = ({ task, index, changeTaskState }) => {
    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    className="flex justify-between items-center text-customText shadow-custom rounded-2xl p-2 sm:p-2.5 transition-all duration-100 ease-in fade-in-from-bottom cursor-pointer"
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
                        <h3 className="text-base md:text-lg mr-8 font-medium">
                            {task.title}
                        </h3>
                    </div>
                    <ViewTaskButton id={task.id} />
                </div>
            )}
        </Draggable>
    );
};

export default CompletedTask;
