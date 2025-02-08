import React from "react";

function IdolCardSkeleton() {
  return (
    <div className="group relative animate-pulse">
      <div className="border border-gray-300 p-6">
        <div className="aspect-square w-full rounded-md bg-gray-300 lg:aspect-auto lg:h-80" />
        <div className="flex flex-col items-center mt-4 space-y-2">
          <div className="h-5 w-3/4 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export default IdolCardSkeleton;
