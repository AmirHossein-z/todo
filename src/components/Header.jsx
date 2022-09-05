import { memo } from "react";
import { AddButton } from "./AddButton";

const Header = () => {
    return (
        <header>
            <div className="flex justify-between items-center p-4 text-customText">
                <h1 className="text-xl tracking-wider">Todo app</h1>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </div>
            </div>
            <AddButton />
        </header>
    );
};

export default memo(Header);
