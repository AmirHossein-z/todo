const Button = ({
    children,
    textColor,
    bgColor,
    borderColor,
    customStyles,
}) => {
    return (
        <button
            className={`py-2 px-2.5 text-base border border-${borderColor} bg-${bgColor} text-${textColor} rounded-md transition-all duration-300 ease-in ${customStyles}`}
        >
            {children}
        </button>
    );
};

export default Button;
