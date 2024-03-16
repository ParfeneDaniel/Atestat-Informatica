import "../style/Choises.css";
import Search from "./Search";
import SelectOption from "./SelectOption";

const Choises = () => {
  return (
    <div className="choises">
      <SelectOption />
      <Search />
    </div>
  );
};

export default Choises;
