import { SwiperSlide } from "swiper/react";

const SkeletonIdolList = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse w-full max-w-sm">
      <div className="w-full h-80 bg-gray-300" />
      <div className="p-4 text-center space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export default SkeletonIdolList;
