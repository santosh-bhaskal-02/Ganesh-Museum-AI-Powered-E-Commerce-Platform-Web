import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import IdolCard from "./IdolCard";
import { IdolContext } from "../ContextApi/IdolContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

import axios from "axios";
import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import IdolCardSkeleton from "./SkeletonLoader";

const apiUrl = import.meta.env.VITE_BACK_END_URL;
const ITEMS_PER_PAGE = 12;

function IdolCardsList() {
  const { idolList } = useContext(IdolContext);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/category/fetch`);
        if (response) {
          setCategories(response.data);
          setSelectedCategories(
            response.data.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {})
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        if (idolList && categories) {
          setLoading(false);
        }
      }
    };
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 100000);

  //   // Cleanup function to clear the timer if the component unmounts
  //   return () => clearTimeout(timer);
  // }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
    setCurrentPage(1);
  }, []);

  const handleResetCategories = () => {
    setSelectedCategories(
      categories.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {})
    );
    setCurrentPage(1);
  };

  const filteredIdols = useMemo(() => {
    return idolList?.filter((idol) => {
      const isCategorySelected = Object.entries(selectedCategories).some(
        ([catId, isSelected]) => isSelected && String(catId) === String(idol.category?.id)
      );
      let isPriceInRange = true;
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange;
        isPriceInRange = idol.price >= min && idol.price <= max;
      }

      const noCategorySelected = !Object.values(selectedCategories).some(Boolean);

      return (noCategorySelected || isCategorySelected) && isPriceInRange;
    });
  }, [idolList, selectedCategories, selectedPriceRange]);

  const sortedAndFilteredIdols = useMemo(() => {
    return [...filteredIdols].sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });
  }, [filteredIdols, sortOrder]);

  const totalPages = Math.ceil(sortedAndFilteredIdols.length / ITEMS_PER_PAGE);
  const idolsToShow = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAndFilteredIdols.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedAndFilteredIdols, currentPage]);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Mobile Sort + Filter Bar */}

      <div className="md:hidden flex items-center justify-center divide-x divide-gray-300 px-4 py-3 bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="flex-1 flex flex-col items-center justify-center gap-1 text-sm font-semibold text-black">
          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="w-4 h-4" />
            Sort
          </div>
          <select
            className="text-sm border border-gray-300 rounded px-2 py-1 mt-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <button
          onClick={() => setShowFilterModal(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-sm font-semibold text-black">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </div>
        </button>
      </div>

      {/* Modal Filter on Mobile */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-11/12 max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-3 right-3 text-gray-700 text-xl"
              onClick={() => setShowFilterModal(false)}>
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Filters</h3>

            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">Categories</h4>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={Object.values(selectedCategories).every((val) => !val)}
                  onChange={handleResetCategories}
                  className="mr-2"
                />
                All
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories[cat.id] || false}
                    onChange={() => handleCategorySelect(cat.id)}
                    className="mr-2"
                  />
                  {cat.name}
                </label>
              ))}
            </div>

            <div className="">
              <h4 className="text-md font-semibold mb-2">Price Range</h4>
              {[
                [500, 1000],
                [1000, 2000],
                [3000, 5000],
                [5000, 100000],
              ].map(([min, max], idx) => (
                <label key={idx} className="block mb-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      selectedPriceRange?.[0] === min && selectedPriceRange?.[1] === max
                    }
                    onChange={() => setSelectedPriceRange([min, max])}
                    className="mr-2"
                  />
                  ₹{min} - ₹{max}
                </label>
              ))}
              <label className="block">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === null}
                  onChange={() => setSelectedPriceRange(null)}
                  className="mr-2"
                />
                All Prices
              </label>
            </div>

            <button
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
              onClick={() => setShowFilterModal(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Sidebar (hidden on mobile) */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-60 bg-white p-6 flex-shrink-0 hidden md:block">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Categories</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition hover:bg-gray-200">
                <input
                  type="checkbox"
                  aria-label="All Categories"
                  checked={Object.values(selectedCategories).every((val) => !val)}
                  onChange={handleResetCategories}
                  className="form-checkbox text-blue-500 w-4 h-4"
                />
                <span className="text-gray-800 text-sm font-medium">All</span>
              </label>
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  htmlFor={`cat-${cat.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition hover:bg-gray-200">
                  <input
                    id={`cat-${cat.id}`}
                    type="checkbox"
                    aria-label={`Category ${cat.name}`}
                    checked={selectedCategories[cat.id] || false}
                    onChange={() => handleCategorySelect(cat.id)}
                    className="form-checkbox text-blue-500 w-4 h-4"
                  />
                  <span className="text-gray-800 text-sm font-medium">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Price Range</h4>
            <div className="space-y-2">
              {[
                [500, 1000],
                [1000, 2000],
                [3000, 5000],
                [5000, 100000],
              ].map(([min, max], index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition hover:bg-gray-200">
                  <input
                    type="radio"
                    name="priceRange"
                    aria-label={`Price ₹${min} to ₹${max}`}
                    checked={
                      selectedPriceRange &&
                      selectedPriceRange[0] === min &&
                      selectedPriceRange[1] === max
                    }
                    onChange={() => {
                      setSelectedPriceRange([min, max]);
                      setCurrentPage(1);
                    }}
                    className="form-radio text-blue-500 w-4 h-4"
                  />
                  <span className="text-gray-800 text-sm font-medium">
                    ₹{min} - ₹{max}
                  </span>
                </label>
              ))}
              <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition hover:bg-gray-200">
                <input
                  type="radio"
                  name="priceRange"
                  aria-label="All Price Ranges"
                  value="all"
                  checked={selectedPriceRange === null}
                  onChange={() => {
                    setSelectedPriceRange(null);
                    setCurrentPage(1);
                  }}
                  className="form-radio text-blue-500 w-4 h-4"
                />
                <span className="text-gray-800 text-sm font-medium">All Prices</span>
              </label>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Sort By</h4>
            <select
              className="w-full px-3 py-2 border rounded-lg bg-white text-gray-800 cursor-pointer"
              value={sortOrder}
              aria-label="Sort Order"
              onChange={(e) => setSortOrder(e.target.value)}>
              <option value="default">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <button
            className="w-full mt-2 text-sm text-red-600 underline"
            onClick={() => {
              handleResetCategories();
              setSelectedPriceRange(null);
              setSortOrder("default");
            }}>
            Reset All Filters
          </button>
        </div>

        {/* Card Grid */}
        {/* Main content */}
        <div className="flex flex-col min-h-screen flex-grow">
          {loading || idolsToShow.length === 0 ? (
            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <IdolCardSkeleton key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {idolsToShow.map((idol) => (
                  <IdolCard
                    key={idol._id}
                    id={idol._id}
                    title={idol.title}
                    thumbnail={idol.thumbnail?.image_url}
                    category={idol.category.name}
                    price={idol.price}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center py-6 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default IdolCardsList;
