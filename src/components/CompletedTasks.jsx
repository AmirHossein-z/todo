import { Task } from "./Task";

export const CompletedTasks = ({ tasks, setTasks }) => {
    return (
        <div className="grid my-5 p-5 items-center gap-y-6 transition-all duration-1000 linear">
            <h2 className="text-lg text-customText tracking-wider font-bold">
                Completed
            </h2>
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
    );
};
