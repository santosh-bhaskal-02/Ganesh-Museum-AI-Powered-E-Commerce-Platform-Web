import React, { useContext } from "react";
import { IdolContext } from "../ContextApi/IdolContext";
import { useNavigate } from "react-router-dom";
//import "./featureIdol.css";

function IdoldetailsList({ id, thumbnail, title, price, description }) {
  const { setIdolId, setIdolList } = useContext(IdolContext);

  const navigate = useNavigate();

  const featureIdeol = async (id) => {
    setIdolId({
      id: id,
      title: title,
      thumbnail: thumbnail,
      price: price,
    });
    navigate(`/idolDetails/`);
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img
        src={thumbnail}
        alt="thumbnail"
        onClick={() => featureIdeol(id)}
        className="w-full h-64 object-cover cursor-pointer"
      />

      <div className="p-4 flex flex-col space-y-2 text-center">
        <h3
          onClick={() => featureIdeol(id)}
          className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
        >
          {title}
        </h3>
        <p className="text-gray-600 text-sm">Price: ₹{price}</p>
        <button
          onClick={() => featureIdeol(id)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default IdoldetailsList;
