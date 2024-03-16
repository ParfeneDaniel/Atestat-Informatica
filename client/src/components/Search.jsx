import { useChoiseContext } from "../context/ChoiseContext";
import "../style/Search.css";

const Search = () => {
  const { setSearch } = useChoiseContext();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter the query for search..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
