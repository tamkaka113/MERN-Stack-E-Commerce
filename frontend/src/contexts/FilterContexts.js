import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();
export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    pageNumber: 1,
    limit:4,
    keyword: "",
    category:'',
    price:'',
    rating:''
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
