import { CompletedTasks } from "./CompletedTasks";
import { Task } from "./Task";

export const Tasks = () => {
    return (
        <main>
            <div
                className={`grid my-5 p-5 items-center gap-y-6 transition-all duration-1000 linear animation animation-appear`}
            >
                <Task />
                <Task />
                <Task />
            </div>
            <CompletedTasks />
        </main>
    );
};
