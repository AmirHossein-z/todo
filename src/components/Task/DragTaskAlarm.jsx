import { memo } from "react";
import { motion } from "framer-motion";
const DragTaskAlarm = () => {
    return (
        <motion.p
            initial={{ scale: 0.5, rotate: -45, borderRadius: "100%" }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-customdark text-yellow-100 text-lg xl:text-xl mt-3 mx-auto font-semibold"
        >
            Drag Task here
        </motion.p>
    );
};

export default memo(DragTaskAlarm);
