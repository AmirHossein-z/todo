import { CompletedTasks } from "./CompletedTasks";
import { Loading } from "./Loading";
import { Task } from "./Task";

export const Tasks = ({ tasks, loading }) => {
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <main>
                    <div
                        className={`grid my-5 p-5 items-center gap-y-6 transition-all duration-1000 linear animation animation-appear`}
                    >
                        {tasks.map((task) => (
                            <Task key={task.id} title={task.title} />
                        ))}
                        <CompletedTasks />
                    </div>
                </main>
            )}
        </>
    );
};
