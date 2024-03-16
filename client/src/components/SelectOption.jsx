import "../style/SelectOption.css";
import { useChoiseContext } from "../context/ChoiseContext";

const SelectOption = () => {
  const { setSelect } = useChoiseContext();
  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  return (
    <div className="selectMeniu" onChange={handleChange}>
      <select>
        <option hidden>Select the type of order</option>
        <option value={1}>After newer</option>
        <option value={2}>After older</option>
        <option value={3}>Importance: desc</option>
        <option value={4}>Importance: asc</option>
        <option value={5}>Status: In progress</option>
        <option value={6}>Status: Finished</option>
      </select>
    </div>
  );
};

export default SelectOption;
