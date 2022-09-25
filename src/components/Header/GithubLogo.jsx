import { memo } from "react";
import { VscGithubInverted } from "react-icons/vsc";

const GithubLogo = () => {
    return (
        <a href="https://github.com/AmirHossein-z/todo">
            <VscGithubInverted className="w-7 h-7 sm:w-8 sm:h-8 text-customText" />
        </a>
    );
};
export default memo(GithubLogo);
