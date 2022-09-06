import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../services/taskService";
import { Button } from "./Button";

export const EditTask = ({
    task,
    setTask,
    setLoading,
    taskId,
    tasks,
    setTasks,
    setViewState,
}) => {
    // update value of inputs with every change happend
    const onTaskChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    // edit task info and navigate to main page
    const editTaskForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data, status: requestStatus } = await updateTask(
                { ...task },
                taskId
            );
            if (requestStatus === 200) {
                const prevTasks = [...tasks];
                let taskIndex = tasks.findIndex((item) => item.id === task.id);
                prevTasks[taskIndex] = data;
                setTasks([...prevTasks]);
                await setTimeout(() => {
                    setViewState(true);
                }, 0);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="grid my-5 p-5 items-center gap-y-6 text-customText fade-in-from-right">
            <form action="" className="grid" onSubmit={editTaskForm}>
                <div className="flex items-center">
                    <label htmlFor="form-title" className="mr-3">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                        id="title"
                        className="py-1.5 px-1 bg-transparent w-full border border-customText border-opacity-50 focus:border-opacity-100 rounded outline-none"
                        value={task.title}
                        onChange={onTaskChange}
                    />
                </div>
                <div className="grid my-3">
                    <label htmlFor="form-body" className="mb-3">
                        Body
                    </label>
                    <textarea
                        name="body"
                        id="body"
                        placeholder="body"
                        className="w-full min-h-[208px] max-h-52 rounded bg-transparent border border-customText border-opacity-50 focus:border-opacity-100 outline-none p-2"
                        value={task.body}
                        onChange={onTaskChange}
                    ></textarea>
                </div>
                <div className="mt-3 justify-center">
                    <Button
                        textColor="customdark"
                        bgColor="customdark"
                        borderColor="customText"
                        customStyles="w-full hover:bg-customText hover:text-customdark active:bg-customText active:text-customdark"
                    >
                        Edit
                    </Button>
                </div>
            </form>
        </main>
    );
};
