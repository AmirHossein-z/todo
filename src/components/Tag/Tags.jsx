import uniqBy from "lodash.uniqby";
import { useMemo } from "react";
import TagTicket from "./TagTicket";

const Tags = ({ tasks, completedTasks }) => {
    const tags = useMemo(() => {
        // get All tags from tasks & completed tasks and show uniq tags
        return uniqBy(
            [
                ...tasks.map((task) => task.tags).flat(1),
                ...completedTasks.map((task) => task.tags).flat(1),
            ],
            "id"
        );
    }, [tasks, completedTasks]);

    if (tags.length === 0) return null;

    return (
        <div className="my-5 p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center items-center gap-5 transition-all duration-700 ease-in fade-in-from-bottom md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl m-auto">
            {tags.map((tag, index) => (
                <TagTicket key={index} text={tag.text} />
            ))}
        </div>
    );
};

export default Tags;
