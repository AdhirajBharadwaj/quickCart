import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchFilterBar from "../Components/SearchFilterBar";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [querycat, setQuerycat] = useState("");
  const [queryprice, setQueryprice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // Fetch all products and categories when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/product?${searchQuery}`
        );
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(response.data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // Handle search functionality
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product?search=${searchTerm}`
      );
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle sort functionality
  const handleSort = async (sortOption) => {
    let currcat = querycat === "" ? "" : `&category=${querycat}`;
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "price_asc": {
        sorted = (
          await axios.get(
            `http://localhost:8000/api/product?sort=price${queryprice}${currcat}`
          )
        ).data.products;
        break;
      }
      case "price_desc": {
        sorted = (
          await axios.get(
            `http://localhost:8000/api/product?sort=-price${queryprice}${currcat}`
          )
        ).data.products;
        break;
      }
      case "name_asc": {
        sorted = (
          await axios.get(
            `http://localhost:8000/api/product?sort=name${queryprice}${currcat}`
          )
        ).data.products;
        break;
      }
      case "name_desc": {
        sorted = (
          await axios.get(
            `http://localhost:8000/api/product?sort=-name${queryprice}${currcat}`
          )
        ).data.products;
        break;
      }
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  // Handle price range filter
  const handlePriceRangeChange = async ({ min, max }) => {
    setQueryprice(`&price[gte]=${min}&price[lte]=${max}`);
    let currcat = querycat === "" ? "" : `&category=${querycat}`;
    const filtered = (
      await axios.get(
        `http://localhost:8000/api/product?price[gte]=${min}&price[lte]=${max}${currcat}`
      )
    ).data.products;
    setFilteredProducts(filtered);
  };

  // Handle category filter
  const handleCategoryFilter = async (category) => {
    if (category === "All") {
      setQuerycat("");
      setFilteredProducts(
        (await axios.get(`http://localhost:3000/api/product`)).data.products
      );
    } else {
      setQuerycat(category);
      const filtered = (
        await axios.get(
          `http://localhost:3000/api/product?category=${category}`
        )
      ).data.products;
      setFilteredProducts(filtered);
    }
  };
  const handleAddToCart = async (product) => {
    const response = await axios.post(
      "http://localhost:8000/api/user/addtocart",
      {
        productId: product._id,
        quantity: 1,
      },
      { withCredentials: true }
    );
    alert("Product added to cart");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">All Products</h1>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Categories
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleCategoryFilter("All")}
              className="bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryFilter(category)}
                className="bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Search and Filter Bar */}
        <SearchFilterBar
          onSearch={handleSearch}
          onSort={handleSort}
          onPriceRangeChange={handlePriceRangeChange}
        />

        {/* Products Grid */}
        <section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 rounded-lg shadow overflow-hidden hover:bg-gray-700 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-100">
                    {product.name}
                  </h3>
                  <p className="text-gray-400">{product.category}</p>
                  <p className="font-bold mt-2 text-gray-200">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AllProducts;
