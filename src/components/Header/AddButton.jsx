import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const AddButton = () => {
    const location = useLocation();

    // check add button is rendered only in main page
    if (!(location.pathname === "/tasks" || location.pathname === "/tasks/")) {
        return null;
    }

    return (
        <Link to="tasks/add">
            <button className="shadow-[9px_7px_17px_rgba(0,0,0,0.5)] active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] rounded-full z-10 flex items-center gap-x-3 fixed right-4 bottom-4 md:static md:inset-0 md:shadow-none md:active:shadow-none">
                <span className="md:text-base lg:text-lg hidden md:block border-2 border-transparent hover:border-customText font-medium rounded-lg py-1.5 px-3.5 transition-all duration-300 ease-linear">
                    Add Task
                </span>
                <div className="text-customdark bg-customText rounded-full md:hidden">
                    <IoIosAdd className="w-8 h-8" />
                </div>
            </button>
        </Link>
    );
};

export default memo(AddButton);
