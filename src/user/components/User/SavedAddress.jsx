import { useNavigate, useOutletContext } from "react-router-dom";
import AddAddress from "../Address/AddAddress";
import { useEffect } from "react";

function SavedAddress() {
  const navigate = useNavigate();
  const { profile } = useOutletContext();

  useEffect(() => {
    if (!profile.address) {
      // navigate("/add_address");
    }
  }, [profile.address, navigate]);

  if (!profile.address) {
    return <AddAddress />;
  }

  const handleEdit = () => {
    navigate(`/profile/add_address`);
  };

  return (
    <div className="border rounded-lg bg-white">
      <div className="flex justify-between items-center bg-blue-100 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Saved Address</h3>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200">
          Edit
        </button>
      </div>

      {/* Address Details */}
      <div className="p-6 space-y-6">
        <div>
          <span className="block font-medium text-gray-700">Name:</span>
          <p className="text-gray-600">
            {profile.address.firstName + " " + profile.address.lastName}
          </p>
        </div>
        <div>
          <span className="block font-medium text-gray-700">Email:</span>
          <p className="text-gray-600">{profile.address.email}</p>
        </div>
        <div>
          <span className="block font-medium text-gray-700">Phone:</span>
          <p className="text-gray-600">{profile.address.phone}</p>
        </div>
        <div>
          <span className="block font-medium text-gray-700">Street:</span>
          <p className="text-gray-600">{profile.address.address1}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="block font-medium text-gray-700">City:</span>
            <p className="text-gray-600">{profile.address.city}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-700">State:</span>
            <p className="text-gray-600">{profile.address.state}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="block font-medium text-gray-700">Postal Code:</span>
            <p className="text-gray-600">{profile.address.zip}</p>
          </div>
          <div>
            <span className="block font-medium text-gray-700">Country:</span>
            <p className="text-gray-600">{profile.address.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedAddress;
