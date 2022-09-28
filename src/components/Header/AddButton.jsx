import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const AddButton = () => {
    const location = useLocation();

    if (!(location.pathname === "/tasks" || location.pathname === "/tasks/")) {
        return null;
    }

    return (
        <Link to="tasks/add">
            <button className="shadow-[9px_7px_17px_rgba(0,0,0,0.5)] active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] rounded-full z-10 flex items-center gap-x-3 fixed right-4 bottom-4 md:static md:inset-0 md:shadow-none md:active:shadow-none">
                <span className="md:text-base lg:text-lg hidden md:block hover:bg-customText hover:text-customdark rounded-md p-2 px-2.5  transition-all duration-300 linear">
                    Add task
                </span>
                <div className="p-1.5 text-customdark bg-customText rounded-full md:hidden">
                    <IoIosAdd className="w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10" />
                </div>
            </button>
        </Link>
    );
};

export default memo(AddButton);
