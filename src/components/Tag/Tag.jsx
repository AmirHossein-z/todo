import { useParams } from "react-router-dom";
import useGetAllTags from "../../hooks/useGetAllTags";
import Loading from "../Loading";
import TasksContainer from "../Task/TasksContainer";
import ViewTaskButton from "../Task/ViewTaskButton";

const Tag = () => {
    const { tagId } = useParams();
    const [loading, filteredTasks] = useGetAllTags(tagId);

    let FilteredTasks = null;
    if (loading) {
        return <Loading />;
    } else if (filteredTasks?.length > 0) {
        FilteredTasks = filteredTasks.map((task, index) => (
            <div
                className="flex justify-between items-center text-customText rounded-2xl p-2 sm:p-2.5 transition-all duration-100 ease-in fade-in-from-bottom cursor-pointer shadow-custom"
                key={index}
            >
                <div className="flex items-center gap-x-3">
                    <h3 className="text-base md:text-lg font-medium">
                        {task.title}
                    </h3>
                </div>
                <ViewTaskButton id={task.id} />
            </div>
        ));
    }

    return (
        <TasksContainer>
            <h2 className="text-base md:text-lg xl:text-xl text-customText tracking-wider font-semibold p-5">
                all tasks which includes{" "}
                <span className="text-yellow-500">#{tagId}</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                {FilteredTasks}
            </div>
        </TasksContainer>
    );
};

export default Tag;
