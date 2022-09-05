import loadingSVG from "../assets/loading.svg";
export const Loading = () => {
    return (
        <main className="flex justify-center mt-10 animate-bounce">
            <img src={loadingSVG} alt="loading" className="w-44" />
        </main>
    );
};
