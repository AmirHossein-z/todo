import { memo } from "react";
import { VscGithubInverted } from "react-icons/vsc";

const GithubLogo = () => {
    return (
        <a href="https://github.com/AmirHossein-z/todo">
            <VscGithubInverted className="w-7 h-7 sm:w-8 sm:h-8 text-customText hover:contrast-150" />
        </a>
    );
};
export default memo(GithubLogo);
