const Button = ({
    children,
    textColor,
    bgColor,
    borderColor,
    customStyles,
    type = "button",
}) => {
    return (
        <button
            type={type}
            className={`py-2 px-4 text-base border border-${borderColor} bg-${bgColor} text-${textColor} rounded-lg transition-all duration-300 ease-in ${customStyles}`}
        >
            {children}
        </button>
    );
};

export default Button;
