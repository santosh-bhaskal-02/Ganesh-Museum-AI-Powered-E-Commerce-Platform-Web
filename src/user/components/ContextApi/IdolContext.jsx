import axios from "axios";
import React, { useState, createContext } from "react";
import { useEffect } from "react";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

const IdolContext = createContext();

function IdolProvider({ children }) {
  const [idolList, setIdolList] = useState([]);
  const [idolId, setIdolId] = useState({
    id: "",
    title: "",
    thumbnail: "",
    price: "",
  });

  useEffect(() => {
    const fetchIdol = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
        const result = response.data.productList;
        setIdolList(result);
        // console.log("idol", response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchIdol();
  }, []);

  return (
    <IdolContext.Provider value={{ idolList, setIdolList, idolId, setIdolId }}>
      {children}
    </IdolContext.Provider>
  );
}

export { IdolContext, IdolProvider };

// Prefixed aliases for use in the merged root App.jsx
const UserIdolContext = IdolContext;
const UserIdolProvider = IdolProvider;
export { UserIdolContext, UserIdolProvider };
