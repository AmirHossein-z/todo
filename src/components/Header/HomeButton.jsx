import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const HomeButton = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/tasks" ? (
                <Link to="/tasks">
                    <HiHome className="w-8 h-8 text-customText xl:w-9 xl:h-9 cursor-pointer" />
                </Link>
            ) : null}
        </>
    );
};

export default memo(HomeButton);
