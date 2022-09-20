import { memo } from "react";
import AddButton from "./AddButton";
import GithubLogo from "./GithubLogo";
import HomeButton from "./HomeButton";
import TagButton from "./TagButton";

const Header = () => {
    return (
        <header>
            <div className="flex justify-between items-center p-2.5 xl:p-3 text-customText font-bold">
                <h1 className="text-lg lg:text-xl tracking-wider">Todo app</h1>
                <div className="flex items-center gap-x-3">
                    <AddButton />
                    <TagButton />
                    <GithubLogo />
                    <HomeButton />
                </div>
            </div>
        </header>
    );
};

export default memo(Header);
