import { Draggable } from "react-beautiful-dnd";
import { BiCircle } from "react-icons/bi";
import ViewTaskButton from "./ViewTaskButton";
import { motion } from "framer-motion";

const Task = ({ task, index, changeTaskState }) => {
    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    className="flex justify-between items-center text-customText rounded-2xl p-2 sm:p-2.5 transition-all duration-100 ease-in shadow-custom cursor-pointer"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <motion.div
                        className="flex items-center gap-x-3"
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.3, ease: "linear" }}
                    >
                        <BiCircle
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            onClick={() => changeTaskState(task)}
                        />
                        <h3 className="text-base md:text-lg mr-8 font-medium">
                            {task.title}
                        </h3>
                    </motion.div>
                    <ViewTaskButton id={task.id} />
                </div>
            )}
        </Draggable>
    );
};

export default Task;
