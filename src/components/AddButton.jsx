import { Link } from "react-router-dom";

export const AddButton = ({ showAddPage, setShowAddPage }) => {
    return (
        <Link
            to="/add"
            onClick={() => {
                setShowAddPage(true);
            }}
        >
            <button className="shadow-[9px_7px_17px_rgba(0,0,0,0.5)] active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] rounded-full p-2 z-10 fixed right-6 bottom-6 bg-">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-customText"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>
        </Link>
    );
};
