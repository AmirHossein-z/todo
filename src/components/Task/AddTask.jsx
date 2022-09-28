import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../services/taskService";
import Button from "../Button";
import Loading from "../Loading";
import { WithContext as InputTags } from "react-tag-input";
import { taskSchema } from "../../validations/taskValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

const AddTask = ({ loading, setLoading, tasks, setTasks }) => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    // add task and navigate to main page
    const AddTaskForm = async (values) => {
        try {
            setLoading(true);
            const { status, data } = await createTask({
                ...values,
                status: false,
                tags: tags,
            });
            if (status === 201) {
                toast.success("New task created!");
                const newTasks = [...tasks, data];
                setTasks(newTasks);
                navigate("/tasks");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTag = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAdditionTag = (tag) => {
        let tagRegex = /[!@#$%^&*()+_\-{};:?/<>.,"'`]/;
        if (!tagRegex.test(tag.text.trim())) {
            setTags([...tags, tag]);
        }
    };

    const handleDrag = () => {};

    if (loading) return <Loading />;

    return (
        <main className="grid my-5 p-5 items-center text-customText fade-in-from-bottom md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl m-auto">
            <Formik
                initialValues={{ title: "", body: "" }}
                validationSchema={taskSchema}
                onSubmit={(values) => {
                    AddTaskForm(values);
                }}
            >
                <Form className="grid gap-y-5">
                    <div className="grid gap-y-2">
                        <label htmlFor="title" className="text-sm md:text-base">
                            Title
                        </label>
                        <Field
                            type="text"
                            placeholder="title"
                            name="title"
                            className="text-sm py-1.5 px-1 bg-transparent w-full border border-customText border-opacity-50 focus:border-opacity-100 rounded outline-none"
                        />
                        <ErrorMessage
                            name="title"
                            render={(msg) => (
                                <div className="text-red-500 text-sm font-bold lg:text-base">
                                    <span>{msg}</span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="grid my-3 gap-y-3">
                        <label
                            htmlFor="body"
                            className="mb-3 text-sm md:text-base"
                        >
                            Body
                        </label>
                        <Field
                            as="textarea"
                            name="body"
                            placeholder="body"
                            className="text-sm w-full min-h-[208px] max-h-52 rounded bg-transparent border border-customText border-opacity-50 focus:border-opacity-100 outline-none p-2.5 sm:p-3"
                        />
                        <ErrorMessage
                            name="body"
                            render={(msg) => (
                                <div className="text-red-500 text-sm font-bold lg:text-base">
                                    <span>{msg}</span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <label htmlFor="tags" className="mb-3 text-base">
                            Tags:
                        </label>
                        <InputTags
                            tags={tags}
                            name="tags"
                            handleDelete={handleDeleteTag}
                            handleAddition={handleAdditionTag}
                            handleDrag={handleDrag}
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
                            type="Submit"
                            textColor="customText"
                            bgColor="customdark"
                            borderColor="customText"
                            customStyles="text-sm w-full sm:w-1/2 mx-auto hover:bg-customText hover:text-customdark active:bg-customText active:text-customdark"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Formik>
        </main>
    );
};

export default AddTask;
