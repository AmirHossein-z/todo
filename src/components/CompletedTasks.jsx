import { Task } from "./Task";

export const CompletedTasks = ({ tasks, setTasks }) => {
    return (
        <div className="grid my-5 p-5 sm:p-7 items-center gap-y-6 transition-all duration-1000 linear">
            <h2 className="text-lg sm:text-xl xl:text-2xl text-customText tracking-wider font-bold">
                Completed
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-6 md:gap-x-6">
                {tasks.map((task) => {
                    {
                        /* show tasks which haven completed */
                    }
                    return task.status ? (
                        <Task
                            key={task.id}
                            task={task}
                            status={task.status}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    ) : null;
                })}
            </div>
        </div>
    );
};
