import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const HomeButton = () => {
    const location = useLocation();

    if (location.pathname === "/tasks" || location.pathname === "/tasks/") {
        return null;
    }

    return (
        <Link to="/tasks">
            <HiHome className="w-8 h-8 text-customText xl:w-9 xl:h-9 cursor-pointer" />
        </Link>
    );
};

export default memo(HomeButton);
