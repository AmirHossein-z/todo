import { Link, useLocation } from "react-router-dom";

const AddButton = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/tasks" ||
            location.pathname === "/tasks/" ? (
                <Link to="tasks/add">
                    <button className="shadow-[9px_7px_17px_rgba(0,0,0,0.5)] active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] rounded-full p-2 lg:p-3 z-10 flex items-center gap-x-3 fixed right-6 bottom-6 md:static md:inset-0 md:shadow-none md:active:shadow-none">
                        <span className="md:text-lg hidden md:block border border-customText hover:bg-customText hover:text-customdark rounded-md p-2 px-2.5  transition-all duration-300 linear">
                            Add new note
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 md:hidden text-customText rounded-full"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </Link>
            ) : null}
        </>
    );
};

export default AddButton;
