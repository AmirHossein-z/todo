import { Link } from "react-router-dom";

const TagTicket = ({ text }) => {
    return (
        <Link to={`/tasks/tags/${text}`}>
            <div className="bg-customText text-customdark py-1.5 px-2 rounded cursor-pointer">
                <p>#{text}</p>
            </div>
        </Link>
    );
};

export default TagTicket;
