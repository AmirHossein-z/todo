import { memo } from "react";
const DragTaskAlarm = () => {
    return (
        <p className="bg-customdark text-yellow-100 text-lg xl:text-xl mt-3 mx-auto font-semibold shake-horizontal">
            Drag Task here
        </p>
    );
};

export default memo(DragTaskAlarm);
