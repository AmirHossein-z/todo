import { useNavigate, useParams } from "react-router-dom";
import useGetAllTags from "../../hooks/useGetAllTags";
import Loading from "../Loading";

const Tag = () => {
    const { tagId } = useParams();
    const [loading, result] = useGetAllTags(tagId);
    const navigate = useNavigate();

    return (
        <div className="transition-all duration-1000 linear max-w-sm md:max-w-xl lg:max-w-3xl m-auto md:m-0">
            <h2 className="text-base md:text-lg xl:text-xl text-customText tracking-wider font-bold p-5">
                {/* all tasks with <span className="text-yellow-100">#{tagId}</span> */}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                {loading ? (
                    <Loading />
                ) : result?.length > 0 ? (
                    result.map((task, index) => (
                        <div
                            className="flex justify-between items-center text-customText shadow-[9px_7px_17px_rgba(0,0,0,0.5)] rounded-2xl p-2 sm:p-2.5 transition-transform duration-100 ease-in active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] fade-in-from-bottom cursor-pointer"
                            key={index}
                        >
                            <div className="flex items-center gap-x-3">
                                <h3 className="text-base md:text-lg">
                                    {task.title}
                                </h3>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer mr-1"
                                    onClick={() => {
                                        navigate(
                                            `/${
                                                task?.status
                                                    ? "completed-tasks/"
                                                    : "tasks/"
                                            }${task?.id}`
                                        );
                                    }}
                                >
                                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    );
};

export default Tag;
