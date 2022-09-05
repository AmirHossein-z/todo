import { CompletedTasks } from "./CompletedTasks";
import { Loading } from "./Loading";
import { Task } from "./Task";

export const Tasks = ({ tasks, setTasks, loading }) => {
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <main>
                    <div className="grid my-5 p-5 items-center gap-y-6 transition-all duration-1000 linear">
                        {tasks.length > 0 ? (
                            tasks.map((task) => {
                                return !task.status ? (
                                    <Task
                                        key={task.id}
                                        task={task}
                                        status={task.status}
                                        tasks={tasks}
                                        setTasks={setTasks}
                                    />
                                ) : null;
                            })
                        ) : (
                            <h3 className="text-xl text-customText animate-pulse justify-self-center">
                                You still don't have any notes
                            </h3>
                        )}
                    </div>
                    <CompletedTasks tasks={tasks} setTasks={setTasks} />
                </main>
            )}
        </>
    );
};
