import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";
import { Button } from "./Button";
import { Loading } from "./Loading";

export const AddTask = ({
    task,
    setTask,
    loading,
    setLoading,
    tasks,
    setTasks,
}) => {
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onTaskChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const AddTaskForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { status, data } = await createTask(task);
            if (status === 201) {
                const newTasks = [...tasks, data];
                setTasks(newTasks);
                setTask({});
                navigate("/tasks");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <main className="grid my-5 p-5 items-center gap-y-6 text-customText">
                    <form action="" className="grid" onSubmit={AddTaskForm}>
                        <div className="flex items-center">
                            <label htmlFor="form-title" className="mr-3">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                id="title"
                                ref={inputRef}
                                className="py-1.5 px-1 bg-transparent w-full border border-customText border-opacity-50 focus:border-opacity-100 rounded outline-none"
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
                                onChange={onTaskChange}
                            ></textarea>
                        </div>
                        <div className="mt-3 justify-center">
                            <Button
                                textColor="customdark"
                                bgColor="customText"
                                borderColor="customText"
                                customStyles="w-full"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </main>
            )}
        </>
    );
};
