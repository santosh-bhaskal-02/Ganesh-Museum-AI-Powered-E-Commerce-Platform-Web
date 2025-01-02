import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

function CartItems({ id, title, thumbnail, price, quantity, onCartUpdate }) {
  const [cartQuantity, setCartQuantity] = useState(quantity);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return null;
  }

  const updateQuantity = async (event) => {
    try {
      const { name } = event.target;
      const action = name === "plus" ? "increment" : "decrement";

      setCartQuantity((prevQty) =>
        action === "increment" ? prevQty + 1 : Math.max(prevQty - 1, 1)
      );

      console.log(id);

      const response = await axios.put(
        `${apiUrl}/api/products/cart/update`,
        { userId, productId: id, action },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
    }
  };

  return (
    <div key={id} className="flex items-center justify-between border-b pb-4 mb-6">
      <div className="flex items-center gap-4">
        <img src={thumbnail} alt={title} className="w-20 h-20 object-cover rounded-lg" />
        <div className="ml-4">
          <h2 className="font-medium text-gray-700">{title}</h2>
          <p className="text-sm text-gray-500">{"Orange"}</p>
          <p className="text-sm text-gray-500">{"2 ft"}</p>
          <p className="text-sm text-green-600">{"In stock"}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center border rounded-md">
          <button
            className="px-3 py-1 text-gray-700"
            name="minus"
            onClick={updateQuantity}>
            -
          </button>
          <span className="px-4 py-1">{cartQuantity}</span>
          <button
            className="px-3 py-1 text-gray-700"
            name="plus"
            onClick={updateQuantity}>
            +
          </button>
        </div>

        <p className="text-gray-700 font-medium">₹ {price}</p>

        <DeleteRoundedIcon
          onClick={() => removeItem(id)}
          className="ml-4 text-red-500 hover:text-red-700"
        />
      </div>
    </div>
  );
}

export default CartItems;
