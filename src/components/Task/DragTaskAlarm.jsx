import { memo } from "react";
const DragTaskAlarm = () => {
    return (
        <p className="text-yellow-100 text-lg xl:text-xl mt-3 mx-auto animate-bounce">
            Drag Task here
        </p>
    );
};

export default memo(DragTaskAlarm);
