export const Task = ({ title }) => {
    return (
        <div className="text-customText shadow-[9px_7px_17px_rgba(0,0,0,0.5)] rounded-2xl flex items-center p-3 transition-transform duration-200 ease-in active:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3)] active:translate-y-1">
            <div className="w-4 h-4 rounded-full border-2 border-customText mr-3 cursor-pointer"></div>
            <h3 className="text-base">{title}</h3>
        </div>
    );
};
