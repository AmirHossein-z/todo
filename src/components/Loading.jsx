import loadingSVG from "../assets/loading.svg";
export const Loading = () => {
    return (
        <div className="flex justify-center mt-10 animate-bounce">
            <img
                src={loadingSVG}
                alt="loading"
                className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-52 2xl:w-56"
            />
        </div>
    );
};
