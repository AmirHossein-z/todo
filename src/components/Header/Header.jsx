import { memo } from "react";
import { Link } from "react-router-dom";
import AddButton from "./AddButton";
import GithubLogo from "./GithubLogo";
import HomeButton from "./HomeButton";
import TagButton from "./TagButton";

const Header = () => {
    return (
        <header>
            <div className="flex justify-between items-center py-3 px-4 text-customText border-b border-customText border-opacity-10">
                <Link
                    to={"/tasks"}
                    className="text-base lg:text-lg tracking-wider font-extrabold"
                >
                    Todo app
                </Link>
                <div className="flex items-center gap-x-3">
                    <AddButton />
                    <TagButton />
                    <HomeButton />
                    <GithubLogo />
                </div>
            </div>
        </header>
    );
};

export default memo(Header);
