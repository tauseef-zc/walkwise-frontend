import { useEffect, useRef, useState } from "react";
import { Search, Close } from "./Icons";

interface TagProps {
  placeHolder?: string;
  options: string[];
  selectedItems?: string[];
  onItemSelect?: (selected: string[]) => void;
}

const TagsDropdown = ({
  options,
  placeHolder,
  selectedItems,
  onItemSelect,
}: TagProps) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(selectedItems ?? []);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTags = options.filter(
    (item: string) =>
      item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.includes(item)
  );

  const isDisable: boolean =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length > 0;

  useEffect(() => {
    if (onItemSelect) onItemSelect(selected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <div className={"relative f-width h-auto text-sm card shadow border-t border-gray-100 dark:border dark:border-gray-700"}>
        {selected?.length ? (
          <div className="bg-gray-50 dark:bg-neutral-800 f-width relative text-xs flex flex-wrap gap-2 p-2">
            {selected.map((tag) => {
              return (
                <div
                  key={tag}
                  className="rounded-full w-fit py-1.5 px-3 shadow bg-white text-gray-500
                  flex items-center gap-2 dark:bg-neutral-700 dark:text-white"
                >
                  {tag}
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setSelected(selected.filter((i) => i !== tag))
                    }
                  >
                    <Close />
                  </div>
                </div>
              );
            })}
            <div className="w-full text-right">
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setSelected([]);
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        ) : null}
        <div className={"flex items-center justify-between p-3 w-100 gap-2.5 " + (selected?.length > 0 ? "border-t border-gray-200 dark:border-gray-700" : "")}>
          <Search />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder={placeHolder ?? "Search or Create tags"}
            className="bg-transparent text-sm flex-1 caret-rose-600 border-none"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                setSelected((prev) => [...prev, query]);
                setQuery("");
                setMenuOpen(true);
              }
            }}
          />
          <button
            className="text-sm disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setSelected((prev) => [...prev, query]);
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          >
            + Add
          </button>
        </div>

        {/* Menu's */}
        {menuOpen ? (
          <div className="card shadow bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin dark:scrollbar-thin dark:scrollbar-thumb-neutral-700 scrollbar-track-slate-50 scrollbar-thumb-slate-200 rounded-md">
            <ul className="w-full">
              {filteredTags?.length ? (
                filteredTags.map((tag, i) => (
                  <li
                    key={tag}
                    className="p-2 cursor-pointer hover:bg-rose-50 dark:hover:bg-neutral-800 hover:text-rose-500 rounded-md w-full"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelected((prev) => [...prev, tag]);
                      setQuery("");
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options available</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TagsDropdown;
