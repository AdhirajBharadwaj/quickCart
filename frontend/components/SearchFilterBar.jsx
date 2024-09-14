import { useState } from "react";

function SearchFilterBar({ onSearch, onSort, onPriceRangeChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSort(value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
    onPriceRangeChange({ ...priceRange, [name]: value });
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <form onSubmit={handleSearch} className="w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-full border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </form>
        <div className="flex space-x-4">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 rounded-full border-2 border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              placeholder="Min"
              className="w-20 p-2 rounded-full border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <span className="text-gray-300">-</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              placeholder="Max"
              className="w-20 p-2 rounded-full border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilterBar;
