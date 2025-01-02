const SkeletonPlaceOrder = () => {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
  
        {/* Product Details */}
        <div className="flex items-center space-x-6 border-b pb-4 mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg shadow"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mt-2"></div>
          </div>
        </div>
  
        {/* Pricing Details */}
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div className="flex justify-between" key={i}>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/6"></div>
            </div>
          ))}
          <div className="flex justify-between border-t pt-4">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/6"></div>
          </div>
        </div>
  
        {/* Buttons */}
        <div className="w-full h-10 bg-gray-200 rounded-lg mt-6"></div>
        <div className="w-full h-10 bg-gray-100 rounded-lg mt-4"></div>
      </div>
    );
  };
  
  export default SkeletonPlaceOrder;
  