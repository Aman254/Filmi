interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = (props) => {
  const { query, setQuery } = props;

  return (
    <div className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-violet-600 p-2 shadow-lg bg-white rounded-b-lg">
      <input
        placeholder="Search for movies..."
        className="peer h-8 w-full border-none bg-transparent p-2  font-poppins font-semibold text-gray-600 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
