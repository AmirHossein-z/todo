import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ViewTaskButton = ({ id }) => {
    const navigate = useNavigate();

    return (
        <div className="p-1">
            <AiFillEye
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:contrast-150"
                onClick={() => {
                    navigate(`/tasks/${id}`);
                }}
            />
        </div>
    );
};

export default ViewTaskButton;
