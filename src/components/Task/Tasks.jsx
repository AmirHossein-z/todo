import { Droppable } from "react-beautiful-dnd";
import CompletedTask from "./CompletedTask";
import Loading from "../Loading";
import Task from "./Task";
import TasksContainer from "./TasksContainer";
import DragTaskAlarm from "./DragTaskAlarm";

const Tasks = ({
    tasks,
    loading,
    completedTasks,
    changeTaskState,
    dropShowBox,
}) => {
    if (loading) return <Loading />;

    return (
        <main className="grid sm:grid-cols-2 gap-y-10 fade-in-from-bottom">
            <Droppable droppableId="1">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div>
                            <h2 className="p-5 text-base md:text-lg xl:text-xl text-customText tracking-wider font-semibold">
                                Tasks
                            </h2>
                            {/* show tasks which haven't completed yet */}
                            <TasksContainer>
                                {dropShowBox.state &&
                                dropShowBox.droppableId === "2" ? (
                                    <DragTaskAlarm />
                                ) : tasks.length > 0 ? (
                                    tasks.map((task, index) => (
                                        <Task
                                            key={task.id}
                                            task={task}
                                            index={index}
                                            changeTaskState={changeTaskState}
                                        />
                                    ))
                                ) : null}
                                {provided.placeholder}
                            </TasksContainer>
                        </div>
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="2">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="">
                            <h2 className="p-5 text-base md:text-lg xl:text-xl text-customText tracking-wider font-semibold">
                                Completed
                            </h2>
                            <TasksContainer>
                                {dropShowBox.state &&
                                dropShowBox.droppableId === "1" ? (
                                    <DragTaskAlarm />
                                ) : completedTasks.length > 0 ? (
                                    completedTasks.map((task, index) => (
                                        <CompletedTask
                                            key={task.id}
                                            task={task}
                                            index={index}
                                            changeTaskState={changeTaskState}
                                        />
                                    ))
                                ) : null}
                                {provided.placeholder}
                            </TasksContainer>
                        </div>
                    </div>
                )}
            </Droppable>
        </main>
    );
};

export default Tasks;
