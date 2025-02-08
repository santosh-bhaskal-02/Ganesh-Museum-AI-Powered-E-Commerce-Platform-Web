import React, { useContext } from "react";
import { IdolContext } from "../ContextApi/IdolContext";
import { useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function IdolCard({ id, thumbnail, title, category, price }) {
  const { setIdolId } = useContext(IdolContext);
  const navigate = useNavigate();

  const feature = () => {
    setIdolId({
      id: id,
      thumbnail: thumbnail,
      title,
      price,
    });
    navigate(`/idoldetails/${id}`);
  };

  return (
      <div className="group relative">
        <div className="border border-gray-300 p-6 rounded-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-100 bg-white">
          {/* Image */}
          <img
              src={thumbnail}
              alt="thumbnail"
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 cursor-pointer"
              onClick={feature}
          />

          <div className="flex flex-col items-center mt-4">
            {/* Title */}
            <h3
                className="font-semibold text-lg mt-4 text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={feature}
            >
              {title}
            </h3>

            {/* Category */}
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
              <Tag className="w-4 h-4 text-yellow-500" />
              <span>{category}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1 mt-2 font-bold text-xl text-green-600">
              <CurrencyRupeeIcon fontSize="small" className="text-green-500" />
              <span>{price}</span>
            </div>

          </div>
        </div>
      </div>
  );
}

export default IdolCard;
