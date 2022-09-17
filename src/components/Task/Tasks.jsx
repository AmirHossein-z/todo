import { Droppable } from "react-beautiful-dnd";
import CompletedTask from "./CompletedTask";
import Loading from "../Loading";
import Task from "./Task";

const Tasks = ({
    tasks,
    loading,
    completedTasks,
    changeTaskState,
    dropShowBox,
}) => {
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <main className="grid sm:grid-cols-2 gap-y-10">
                    <Droppable droppableId="1">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div>
                                    <h2 className="p-5 text-base md:text-lg xl:text-xl text-customText tracking-wider font-bold">
                                        Tasks
                                    </h2>
                                    <div className="grid gap-y-6 p-3 items-center transition-all duration-1000 linear max-w-md md:max-w-lg m-auto md:m-0">
                                        {dropShowBox.state &&
                                        dropShowBox.droppableId === "2" ? (
                                            <p className="text-yellow-100 text-lg md:text-lg xl:text-xl mt-10 mx-auto animate-bounce">
                                                Drag Task here
                                            </p>
                                        ) : tasks.length > 0 ? (
                                            tasks.map((task, index) => (
                                                <Task
                                                    key={task.id}
                                                    task={task}
                                                    index={index}
                                                    changeTaskState={
                                                        changeTaskState
                                                    }
                                                />
                                            ))
                                        ) : null}
                                        {/* show tasks which haven't completed yet */}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="2">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="">
                                    <h2 className="p-5 text-base md:text-lg xl:text-xl text-customText tracking-wider font-bold">
                                        Completed
                                    </h2>
                                    <div className="grid gap-y-6 p-3 transition-all duration-1000 linear max-w-md md:max-w-lg m-auto md:m-0">
                                        {dropShowBox.state &&
                                        dropShowBox.droppableId === "1" ? (
                                            <p className="text-yellow-100 md:text-lg xl:text-xl text-lg mt-10 mx-auto animate-bounce">
                                                Drag Task here
                                            </p>
                                        ) : completedTasks.length > 0 ? (
                                            completedTasks.map(
                                                (task, index) => (
                                                    <CompletedTask
                                                        key={task.id}
                                                        task={task}
                                                        index={index}
                                                        changeTaskState={
                                                            changeTaskState
                                                        }
                                                    />
                                                )
                                            )
                                        ) : null}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </main>
            )}
        </>
    );
};

export default Tasks;
