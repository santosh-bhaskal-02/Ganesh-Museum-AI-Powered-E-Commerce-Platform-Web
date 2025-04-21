import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import {
    FilePlus2,
    ImagePlus,
    Loader2,
    XCircle,
    SendHorizonal,
    Ruler,
    Info,
    Eye,
} from "lucide-react";
import {motion} from "framer-motion";
import AlertBox from "../404ErrorPage/AlertBox";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";
import SuggestionSkeletan from "./SuggestionSkeletan.jsx";
import NoCustomForm from "./NoCustomForm.jsx";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function CustomForm() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingSkeletan, setLoadingSkeletan] = useState(true);
    const [form, setForm] = useState(null);

    const [suggestions, setSuggestions] = useState({
        suggestion: "",
        height: "",
        specification: "",
        image: null,
    });

    const userId = Cookies.get("userId");
    const authToken = Cookies.get("authToken");

    if (!userId || !authToken) {
        return <SignInErrorPage/>;
    }

    useEffect(() => {
        setLoadingSkeletan(true);
        const fetchFormDetails = async () => {
            try {
                console.log(userId);
                const response = await axios.get(
                    `${apiUrl}/api/custom-idol/fetch/user/${userId}`,
                    {
                        headers: {Authorization: `Bearer ${authToken}`},
                    }
                );

                console.log(response.data.result);
                setForm(response.data.result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
                setLoadingSkeletan(false);
            }
        };

        fetchFormDetails();
    }, [userId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSuggestions((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSuggestions((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const addSuggestion = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("suggestion", suggestions.suggestion);
        formData.append("size", suggestions.height);
        formData.append("otherSpecifications", suggestions.specification);
        if (suggestions.image) {
            formData.append("image", suggestions.image);
        }

        try {
            const response = await axios.post(
                `${apiUrl}/api/custom-idol/add/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                console.log(response.data.message);
                setAlert({
                    type: "success",
                    title: "Successful!",
                    message: response.data.message,
                });
                setSuggestions({
                    suggestion: "",
                    height: "",
                    specification: "",
                    photo: null,
                });
                document.getElementById("image").value = null;
            } else {
                setAlert({
                    type: "error",
                    title: "Oops!",
                    message: "Failed to submit suggestion. Try again!",
                });
            }
        } catch (error) {
            console.error(error);
            setAlert({
                type: "error",
                title: "Oops!",
                message: error.response?.data?.message || "Something went wrong. Try again!",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setSuggestions({
            suggestion: "",
            height: "",
            specification: "",
            photo: null,
        });
        document.getElementById("photo").value = null;
    };

    return (
        <div className="bg-yellow-50 min-h-screen py-10 px-4 flex items-center justify-center">
            {alert && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
                    <AlertBox
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        onClick={() => setAlert(null)}
                    />
                </div>
            )}

            {loading && <LoadingSpinner/>}

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-yellow-100">
                    <h2 className="text-3xl font-bold text-yellow-600 flex items-center gap-2 border-b pb-2">
                        <FilePlus2 className="w-7 h-7 text-yellow-500"/>
                        Add Suggestion
                    </h2>

                    <form className="space-y-6" onSubmit={addSuggestion}>
                        {/* Suggestion */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <FilePlus2 className="w-4 h-4 text-yellow-500"/>
                                Suggestion
                            </label>
                            <textarea
                                id="suggestion"
                                name="suggestion"
                                rows="4"
                                required
                                value={suggestions.suggestion}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50"
                                placeholder="Write your suggestion here..."
                            />
                        </div>

                        {/* Height */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <Ruler className="w-4 h-4 text-yellow-500"/>
                                Height (in cm or inches)
                            </label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={suggestions.height}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50"
                                placeholder="e.g. 12 inches / 30 cm"
                            />
                        </div>

                        {/* Other Specifications */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <Info className="w-4 h-4 text-yellow-500"/>
                                Other Specifications
                            </label>
                            <input
                                type="text"
                                id="specification"
                                name="specification"
                                value={suggestions.specification}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50"
                                placeholder="e.g. color, material, special notes"
                            />
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <ImagePlus className="w-4 h-4 text-yellow-500"/>
                                Photo (Optional)
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <button
                                type="reset"
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-6 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all">
                                <XCircle className="w-4 h-4"/>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all disabled:opacity-60">
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin"/>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <SendHorizonal className="w-4 h-4"/>
                                        Submit
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div
                    className="p-6 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 space-y-6">
                    <h3 className="text-3xl font-bold text-blue-700 border-b pb-3">
                        Your Custom Idol Suggestion
                    </h3>
                    {loadingSkeletan ? (

                        <SuggestionSkeletan/>
                    ) : form && form.length > 0 ? (

                        form.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-6 border border-blue-100 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow mb-6"
                            >
                                {/* Image Block */}
                                {item.thumbnail.image_url ? (
                                    <img
                                        src={item.thumbnail.image_url}
                                        alt="Custom Idol"
                                        className="w-36 h-36 object-cover rounded-xl border-2 border-blue-200 shadow"
                                    />
                                ) : (
                                    <div
                                        className="w-36 h-36 flex items-center justify-center bg-gray-100 text-gray-400 border-2 border-blue-200 rounded-xl">
                                        No Image
                                    </div>
                                )}

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between space-y-3">
                                    <div className="space-y-2 text-gray-800">
                                        <p className="font-semibold text-base sm:text-lg">
                                            <span className="text-yellow-600">Suggestion:</span> {item.suggestion}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium text-gray-600">Height:</span> {item.size}
                                        </p>
                                        <span
                                            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full shadow-sm bg-gray-100 ${
                                                item.status === "Rejected" ? "text-red-600" : "text-blue-600"
                                            }`}
                                        >
  {item.status}
</span>


                                    </div>


                                    <div className="flex justify-end">
                                        <motion.button
                                            whileHover={{scale: 1.02}}
                                            whileTap={{scale: 0.97}}
                                            onClick={() => navigate(`/custom_form/${item.id}`)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow transition-all"
                                        >
                                            <Eye className="w-4 h-4"/>
                                            View Full Details
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoCustomForm/>
                    )}


                </div>
            </div>
        </div>
    );
}

export default CustomForm;
