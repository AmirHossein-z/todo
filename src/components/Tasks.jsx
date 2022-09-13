import { updateTask } from "../services/taskService";
import { CompletedTask } from "./CompletedTask";
import { Loading } from "./Loading";
import { Task } from "./Task";

export const Tasks = ({
    tasks,
    setTasks,
    loading,
    completedTasks,
    setCompletedTasks,
}) => {
    // toggle task status whenever a task is clicked
    const changeTaskState = async (task) => {
        try {
            const { data, status: requestStatus } = await updateTask(
                {
                    ...task,
                    status: !task.status,
                },
                task.id
            );
            if (requestStatus === 200) {
                if (data.status) {
                    const prevTasks = [...tasks];
                    let taskIndex = prevTasks.findIndex(
                        (item) => item.id === task.id
                    );
                    prevTasks.splice(taskIndex, 1);
                    setTasks([...prevTasks]);

                    setCompletedTasks([...completedTasks, data]);
                } else {
                    const prevCompletedTasks = [...completedTasks];
                    let index = prevCompletedTasks.findIndex(
                        (item) => item.id === task.id
                    );
                    prevCompletedTasks.splice(index, 1);
                    setCompletedTasks([...prevCompletedTasks]);

                    setTasks([...tasks, data]);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <main>
                    <div className="">
                        <h2 className="p-5 sm:p-7 text-lg sm:text-xl xl:text-2xl text-customText tracking-wider font-bold">
                            Tasks
                        </h2>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-5 sm:p-7 items-center gap-y-6 md:gap-x-6 transition-all duration-1000 linear">
                            {/* show tasks which haven't completed yet */}
                            {tasks.length > 0
                                ? tasks.map((task) => {
                                      return !task.status ? (
                                          <Task
                                              key={task.id}
                                              task={task}
                                              changeTaskState={changeTaskState}
                                          />
                                      ) : null;
                                  })
                                : null}
                        </div>
                    </div>
                    <div className="grid my-5 p-5 sm:p-7 items-center gap-y-6 transition-all duration-1000 linear">
                        <h2 className="text-lg sm:text-xl xl:text-2xl text-customText tracking-wider font-bold">
                            Completed
                        </h2>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-6 md:gap-x-6">
                            {completedTasks.length > 0
                                ? completedTasks.map((task) => (
                                      <CompletedTask
                                          key={task.id}
                                          task={task}
                                          changeTaskState={changeTaskState}
                                      />
                                  ))
                                : null}
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};
