const SkeletonAddressCard = () => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-50 px-6 py-4 border-b border-gray-200">
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="h-8 w-20 bg-blue-300 rounded" />
      </div>

      {/* Address Details */}
      <div className="px-6 py-4 space-y-4 text-gray-700">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-1" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-1" />
            <div className="h-5 bg-gray-200 rounded w-full" />
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-1" />
            <div className="h-5 bg-gray-200 rounded w-full" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-1" />
            <div className="h-5 bg-gray-200 rounded w-full" />
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-1" />
            <div className="h-5 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 bg-gray-100 px-6 py-4 border-t border-gray-200">
        <div className="h-10 w-24 bg-gray-300 rounded" />
        <div className="h-10 w-24 bg-blue-300 rounded" />
      </div>
    </div>
  );
};

export default SkeletonAddressCard;
