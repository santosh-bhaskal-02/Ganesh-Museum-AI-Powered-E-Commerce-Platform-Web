const SkeletanIdolDetails = () => {
    return (
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-10 w-full max-w-6xl min-h-[600px] animate-pulse">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full md:w-96 h-80 bg-gray-300 rounded-lg" />
        </div>
  
        <div className="w-full md:w-1/2 px-6 space-y-6 mt-6 md:mt-0">
          <div className="h-10 bg-gray-300 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-300 rounded w-1/4" />
          <div className="h-5 bg-red-300 rounded w-1/3" />
          <div className="h-24 bg-gray-200 rounded" />
  
          <div className="flex items-center space-x-4">
            <div className="h-6 w-24 bg-gray-300 rounded" />
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 bg-gray-300 rounded" />
              <div className="h-12 w-12 bg-gray-300 rounded" />
            </div>
          </div>
  
          <div className="flex space-x-4 mt-6">
            <div className="h-14 w-36 bg-yellow-300 rounded-lg" />
            <div className="h-14 w-36 bg-blue-400 rounded-lg" />
            <div className="h-14 w-14 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletanIdolDetails;
  