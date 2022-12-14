import { updateTask } from "../../services/taskService";
import Button from "../Button";
import { WithContext as InputTags } from "react-tag-input";
import { taskSchema } from "../../validations/taskValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const EditTask = ({
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
    const handleDeleteTag = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const handleAdditionTag = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = () => {};

    // edit task info and navigate to main page
    const editTaskForm = async (values) => {
        try {
            setLoading(true);
            const { status: requestStatus, data } = await updateTask(
                { ...values, tags: tags },
                taskId
            );
            if (requestStatus === 200) {
                toast.info("Task Updated!");
                setTask({ ...values, tags: tags });
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
                    setViewState(false);
                }, 0);
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.main
            className="grid my-5 p-5 items-center text-customText md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl m-auto"
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.3, ease: "linear" }}
        >
            <Formik
                initialValues={{
                    title: task.title,
                    body: task.body,
                    status: task.status,
                }}
                validationSchema={taskSchema}
                onSubmit={(values) => {
                    editTaskForm(values);
                }}
            >
                <Form className="grid gap-y-5">
                    <div className="grid gap-y-2">
                        <label
                            htmlFor="edit_title"
                            className="mr-3 text-sm md:text-base font-semibold"
                        >
                            Title
                        </label>
                        <Field
                            type="text"
                            placeholder="title"
                            name="title"
                            id="edit_title"
                            className="text-sm py-1.5 px-3.5 bg-transparent w-full border border-customText border-opacity-50 focus:border-opacity-100 rounded-lg outline-none"
                        />
                        <ErrorMessage
                            name="title"
                            render={(msg) => (
                                <div className="text-red-500 text-sm font-semibold lg:text-base">
                                    <span>{msg}</span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="grid my-3 gap-y-3">
                        <label
                            htmlFor="edit_body"
                            className="mb-3 text-sm md:text-base font-semibold"
                        >
                            Body
                        </label>
                        <Field
                            as="textarea"
                            name="body"
                            placeholder="body"
                            id="edit_body"
                            className="text-sm w-full min-h-[208px] max-h-52 rounded-lg bg-transparent border border-customText border-opacity-50 focus:border-opacity-100 outline-none p-2.5 sm:p-3"
                        />
                        <ErrorMessage
                            name="body"
                            render={(msg) => (
                                <div className="text-red-500 text-sm font-semibold lg:text-base">
                                    <span>{msg}</span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <label
                            htmlFor="edit_tags"
                            className="mb-3 text-base font-semibold"
                        >
                            Tags:
                        </label>
                        <InputTags
                            tags={tags}
                            handleDelete={handleDeleteTag}
                            handleAddition={handleAdditionTag}
                            handleDrag={handleDrag}
                            name="tags"
                            id="edit_tags"
                            inputFieldPosition="bottom"
                            delimiters={[13, 32]}
                        />
                        <span className="text-sm lg:text-base text-yellow-100 mt-2 grid gap-y-1">
                            press enter or space key to add another tag
                            <span>
                                your text tag must be <u>plain text</u>
                            </span>
                        </span>
                    </div>
                    <div className="mt-3 flex justify-center">
                        <Button
                            type="submit"
                            textColor="customText"
                            bgColor="customdark"
                            borderColor="customText"
                            customStyles="text-sm sm:text-base font-semibold w-full sm:w-3/4 mx-auto hover:bg-customText hover:text-customdark active:bg-customText active:text-customdark"
                        >
                            Edit
                        </Button>
                    </div>
                </Form>
            </Formik>
        </motion.main>
    );
};

export default EditTask;
