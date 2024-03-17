import { createContext, useContext, useState } from "react";

export const ChoiseContext = createContext();

export const useChoiseContext = () => {
  return useContext(ChoiseContext);
};

export const ChoiseContextProvider = ({ children }) => {
  const [select, setSelect] = useState(1);
  const [search, setSearch] = useState("");
  const value = { select, setSelect, search, setSearch };
  return (
    <ChoiseContext.Provider value={value}>{children}</ChoiseContext.Provider>
  );
};
