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
        FilteredTasks = <Loading />;
    } else if (filteredTasks?.length > 0) {
        FilteredTasks = filteredTasks.map((task, index) => (
            <div
                className="flex justify-between items-center text-customText shadow-[9px_7px_17px_rgba(0,0,0,0.5)] rounded-2xl p-2 sm:p-2.5 transition-transform duration-100 ease-in active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] fade-in-from-bottom cursor-pointer"
                key={index}
            >
                <div className="flex items-center gap-x-3">
                    <h3 className="text-base md:text-lg">{task.title}</h3>
                </div>
                <ViewTaskButton id={task.id} />
            </div>
        ));
    }

    return (
        <TasksContainer>
            <h2 className="text-base md:text-lg xl:text-xl text-customText tracking-wider font-bold p-5">
                all tasks with <span className="text-yellow-100">#{tagId}</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                {FilteredTasks}
            </div>
        </TasksContainer>
    );
};

export default Tag;
