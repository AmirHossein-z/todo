import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
    return (
        <div className="bg-customdark text-customText grid justify-center gap-y-3 mt-24">
            <TbError404 className="text-5xl sm:text-6xl md:text-7xl justify-self-center" />
            <p className="text-base sm:text-lg md:text-xl xl:text-2xl">
                The page you wanted was not found
            </p>
            <Link
                to="/tasks"
                className="justify-self-center font-bold md:text-lg"
            >
                <u>Go to main page</u>
            </Link>
        </div>
    );
};

export default NotFound;
