import { useEffect, useRef } from "react";

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = (props) => {
  const inputEl = useRef<HTMLInputElement | null>(null);
  const { query, setQuery } = props;

  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter" && inputEl.current) {
          inputEl.current.focus();
          setQuery("");
        }
      }
      if (inputEl.current) {
        inputEl.current.focus();
      }
      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <div className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-violet-600 p-2 shadow-lg bg-white rounded-b-lg">
      <input
        placeholder="Search for movies..."
        className="peer h-8 w-full border-none bg-transparent p-2  font-poppins font-semibold text-gray-600 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </div>
  );
};
