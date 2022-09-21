import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

const TagButton = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/tasks" ||
            location.pathname === "/tasks/" ? (
                <Link to={"/tasks/tags"}>
                    <div>
                        <span className="md:text-base hidden md:block border border-customText hover:bg-customText hover:text-customdark rounded-md p-2 px-2.5 transition-all duration-300 linear">
                            Tags
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-7 h-7 text-customText md:hidden"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </Link>
            ) : null}
        </>
    );
};

export default memo(TagButton);