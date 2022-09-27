import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="bg-customdark grid justify-center gap-y-5 mt-24">
            <p className="text-customText text-base sm:text-lg md:text-xl xl:text-2xl animate-bounce">
                The page you wanted was not found
            </p>
            <Link
                to="/tasks"
                className="justify-self-center font-bold text-customText md:text-lg"
            >
                <u>Go to main page</u>
            </Link>
        </div>
    );
};

export default NotFound;
