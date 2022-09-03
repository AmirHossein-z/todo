export const Button = ({
    children,
    textColor,
    bgColor,
    borderColor,
    customStyles,
}) => {
    return (
        <button
            className={`py-2 px-2.5 text-base border border-${borderColor} rounded-md hover:bg-${bgColor} hover:text-${textColor} transition-all duration-300 ease-in active:text-${textColor} active:bg-${bgColor} ${customStyles}`}
        >
            {children}
        </button>
    );
};
