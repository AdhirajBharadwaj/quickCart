import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // State to manage cart items

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:8000/api/product");
      setProducts(response.data.products);
      setDisplayedProducts(response.data.products);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(response.data.products.map((product) => product.category)),
      ];
      setCategories(["All", ...uniqueCategories]);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/addtocart",
        {
          productId: product._id,
          quantity: 1,
        },
        { withCredentials: true }
      );
      alert("Product added to cart");
    } catch (error) {
      if (error.response.status === 401) {
        alert("Please login to add to cart");
      } else {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const handleCategoryClick = async (category) => {
    // Filter products by category
    try {
      if (category === "All") {
        const response = await axios.get("http://localhost:8000/api/product");
        setDisplayedProducts(response.data.products);
      } else {
        const response = await axios.get(
          `http://localhost:8000/api/product?category=${category}`
        );
        setDisplayedProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto py-4 sm:py-8 px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-100">
          Explore Mens Fashion
        </h1>

        {/* Product Categories */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-300">
            Product Categories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
            {categories.map((category, index) => (
              <button key={index} onClick={() => handleCategoryClick(category)}>
                <div className="bg-gray-800 p-2 sm:p-4 rounded-lg shadow text-center text-gray-300 hover:bg-gray-700 transition-colors">
                  <p className="text-sm sm:text-base">{category}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-300">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedProducts.slice(0, 5).map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 rounded-lg shadow overflow-hidden hover:bg-gray-700 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-100 text-sm sm:text-base">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {product.category}
                  </p>
                  <p className="font-bold mt-1 sm:mt-2 text-gray-200 text-sm sm:text-base">
                    ₹{product.price}
                  </p>
                  <button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded w-full transition-colors text-sm sm:text-base"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Show All Products Button */}
        <button
          onClick={() => navigate("/allproducts")}
          className="mt-4 relative left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
        >
          Show All Products
        </button>
      </main>
    </div>
  );
}

export default Home;
