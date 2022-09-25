import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineHashtag } from "react-icons/hi";

const TagButton = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/tasks" ||
            location.pathname === "/tasks/" ? (
                <Link to={"/tasks/tags"}>
                    <div>
                        <span className="md:text-base lg:text-lg hidden md:block hover:bg-customText hover:text-customdark rounded-md p-2 px-2.5 transition-all duration-300 linear">
                            Tags
                        </span>
                        <HiOutlineHashtag className="w-7 h-7 text-customText md:hidden" />
                    </div>
                </Link>
            ) : null}
        </>
    );
};

export default memo(TagButton);
