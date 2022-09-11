import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";
import { Button } from "./Button";
import { Loading } from "./Loading";

export const AddTask = ({ loading, setLoading, tasks, setTasks }) => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [task, setTask] = useState({});

    // auto focus on first input when addTask component is mounted
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // update value of inputs with every change happend
    const onTaskChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    // add task and navigate to main page
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
                <main className="grid my-5 p-5 items-center text-customText fade-in-from-bottom md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl m-auto">
                    <form
                        action=""
                        className="grid gap-y-5"
                        onSubmit={AddTaskForm}
                    >
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
                                ref={inputRef}
                                className="text-sm py-1.5 px-1 bg-transparent w-full border border-customText border-opacity-50 focus:border-opacity-100 rounded outline-none"
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
                                onChange={onTaskChange}
                            ></textarea>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <Button
                                textColor="customdark"
                                bgColor="customdark"
                                borderColor="customText"
                                customStyles="text-sm w-full sm:w-1/2 mx-auto hover:bg-customText hover:text-customdark active:bg-customText active:text-customdark"
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
