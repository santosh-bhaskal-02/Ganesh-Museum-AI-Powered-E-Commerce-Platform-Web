import React from "react";

export default function Dialog() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="bg-white rounded-lg shadow-md p-6 w-96 text-center">
        <div className="flex justify-center items-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
          <svg
            className="w-6 h-6 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m-6 2a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Authentication successful</h2>
        <p className="text-gray-500 mt-2">
       You successfully Signed IN ..!
        </p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
         
        >
          Go back to Shopping !
        </button>
      </div>
    </div>
  );
}
