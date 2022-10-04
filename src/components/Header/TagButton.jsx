import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineHashtag } from "react-icons/hi";

const TagButton = () => {
    const location = useLocation();

    if (!(location.pathname === "/tasks" || location.pathname === "/tasks/")) {
        return null;
    }

    return (
        <Link to={"/tasks/tags"}>
            <div>
                <span className="md:text-base lg:text-lg hidden md:block border-2 border-transparent hover:border-customText font-medium rounded-lg py-1.5 px-3.5 transition-all duration-300 ease-linear">
                    Tags
                </span>
                <HiOutlineHashtag className="w-7 h-7 text-customText md:hidden" />
            </div>
        </Link>
    );
};

export default memo(TagButton);
