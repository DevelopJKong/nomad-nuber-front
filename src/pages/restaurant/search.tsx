import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  return <div>Search</div>;
};

export default Search;
