import { updateTask } from "../services/taskService";
import { Button } from "./Button";
import { WithContext as InputTags } from "react-tag-input";

export const EditTask = ({
    task,
    setTask,
    setLoading,
    taskId,
    tasks,
    setTasks,
    setViewState,
    completedTasks,
    setCompletedTasks,
    tags,
    setTags,
}) => {
    // update value of inputs with every change happend
    const onTaskChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleDeleteTag = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const handleAdditionTag = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = () => {};

    // edit task info and navigate to main page
    const editTaskForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { status: requestStatus, data } = await updateTask(
                { ...task, tags: tags },
                taskId,
                task.status
            );
            if (requestStatus === 200) {
                if (data.status) {
                    const prevTasks = [...completedTasks];
                    let taskIndex = completedTasks.findIndex(
                        (item) => item.id === task.id
                    );
                    prevTasks[taskIndex] = data;
                    setCompletedTasks([...prevTasks]);
                } else {
                    const prevTasks = [...tasks];
                    let taskIndex = tasks.findIndex(
                        (item) => item.id === task.id
                    );
                    prevTasks[taskIndex] = data;
                    setTasks([...prevTasks]);
                }
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
        <main className="grid my-5 p-5 items-center text-customText fade-in-from-right md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl m-auto">
            <form action="" className="grid gap-y-5" onSubmit={editTaskForm}>
                <div className="flex items-center">
                    <label
                        htmlFor="form-title"
                        className="mr-3 text-sm md:text-base"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                        id="title"
                        className="text-sm py-1.5 px-1 bg-transparent w-full border border-customText border-opacity-50 focus:border-opacity-100 rounded outline-none"
                        value={task.title}
                        onChange={onTaskChange}
                    />
                </div>
                <div className="grid my-3">
                    <label
                        htmlFor="form-body"
                        className="mb-3 text-sm md:text-base"
                    >
                        Body
                    </label>
                    <textarea
                        name="body"
                        id="body"
                        placeholder="body"
                        className="text-sm w-full min-h-[208px] max-h-52 rounded bg-transparent border border-customText border-opacity-50 focus:border-opacity-100 outline-none p-2.5 sm:p-3"
                        value={task.body}
                        onChange={onTaskChange}
                    ></textarea>
                </div>
                <div className="flex flex-col justify-center">
                    <label htmlFor="tags" className="mb-3 text-base">
                        Tags:
                    </label>
                    <InputTags
                        tags={tags}
                        handleDelete={handleDeleteTag}
                        handleAddition={handleAdditionTag}
                        handleDrag={handleDrag}
                        name="tags"
                        id="tags"
                        inputFieldPosition="bottom"
                        delimiters={[188, 13]}
                    />
                    <span className="text-sm text-yellow-100 mt-2">
                        press enter or comma to add another tag
                    </span>
                </div>
                <div className="mt-3 flex justify-center">
                    <Button
                        textColor="customText"
                        bgColor="customdark"
                        borderColor="customText"
                        customStyles="text-sm w-full sm:w-1/2 mx-auto hover:bg-customText hover:text-customdark active:bg-customText active:text-customdark"
                    >
                        Edit
                    </Button>
                </div>
            </form>
        </main>
    );
};
