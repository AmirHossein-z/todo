const TasksContainer = ({ children }) => {
    return (
        <div className="grid gap-y-6 p-3 items-center transition-all duration-1000 linear max-w-md md:max-w-lg m-auto md:m-0">
            {children}
        </div>
    );
};

export default TasksContainer;
