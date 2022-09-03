import { CompletedTasks } from "./CompletedTasks";
import { Task } from "./Task";
import loadingSVG from "../assets/loading.svg";

export const Tasks = ({ tasks, loading }) => {
    return (
        <>
            {loading ? (
                <main className="flex justify-center mt-10">
                    {" "}
                    <img src={loadingSVG} alt="loading" className="w-44" />{" "}
                </main>
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
