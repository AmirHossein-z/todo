import { useRef } from "react";
import { useState } from "react";

const MAX_TAG_NUMBER = 6;
// 13 -> enter key
// 32 -> space key
const DELIMITER = [13, 32];

const InputTags = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);
    const canAddTag = () => {
        return tags.length < MAX_TAG_NUMBER;
    };

    const isTagExist = (value) => {
        return tags.find((tag) => tag.id.toLowerCase() === value.toLowerCase());
    };

    const isValid = (value) => {
        let regex = /^[\w]+$/;
        if (
            canAddTag() &&
            !isTagExist(value) &&
            regex.test(value.toLowerCase())
        ) {
            return true;
        }
        return false;
    };

    const keyDown = (e) => {
        // check if space or enter key pressed
        if (
            DELIMITER.includes(e.keyCode) &&
            inputValue &&
            isValid(inputValue)
        ) {
            // prevent from submiting form when enter was pressed
            e.preventDefault();
            setTags([...tags, { id: inputValue, text: inputValue }]);
            setInputValue("");
        } else if (e.key === "Backspace" && !inputValue) {
            // remove last tag item
            removeTag(tags.length - 1);
        }
        inputRef.current.focus();
    };

    const removeTag = (tagIndex) => {
        const newTags = [...tags];
        newTags.splice(tagIndex, 1);
        setTags(newTags);
    };

    return (
        <div className="grid">
            <ul className="flex flex-wrap gap-2.5 mb-2">
                {tags.length > 0
                    ? tags.map((item, index) => (
                          <li
                              key={item.id}
                              className="bg-customText text-customdark rounded-lg px-2 py-1 sm:py-1.5 flex items-center justify-center gap-2.5 text-sm sm:text-base font-medium"
                          >
                              {item.text}
                              <button
                                  type="button"
                                  onClick={() => {
                                      removeTag(index);
                                  }}
                              >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-4 h-4 sm:w-5 sm:h-5 text-red-700"
                                  >
                                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                  </svg>
                              </button>
                          </li>
                      ))
                    : null}
            </ul>
            <input
                ref={inputRef}
                type="text"
                placeholder="new tag"
                className="transition-all duration-300 ease-linear bg-transparent border border-customText border-opacity-50 focus:border-opacity-100 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-lg placeholder:text-xs sm:placeholder:text-sm placeholder:text-gray-400 outline-none w-full"
                value={inputValue}
                onKeyDown={(e) => keyDown(e)}
                onChange={(e) => {
                    if (e.target.value[0] !== " ") {
                        setInputValue(e.target.value);
                    }
                }}
            />
        </div>
    );
};

export default InputTags;
