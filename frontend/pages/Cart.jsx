import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartproducts, setcartproducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCartItems() {
      try {
        // Attempt to fetch cart items
        const response = await axios.get(
          "http://localhost:8000/api/user/cart",
          { withCredentials: true }
        );
        // Using Promise.all to wait for all promises to resolve and then storing the results
        const cartproducts = await Promise.all(
          response.data.cart.map(async (item) => {
            const product = await axios.get(
              `http://localhost:8000/api/product/${item.productId}`
            );
            return { product: product.data.product, quantity: item.quantity };
          })
        );
        setcartproducts(cartproducts);
        setCartItems(response.data.cart);
      } catch (error) {
        // Check if the error is due to unauthorized access
        if (error.response && error.response.status === 401) {
          // If unauthorized, navigate to the login page
          console.log("User is unauthorized. Redirecting to login.");
          navigate("/login");
        } else {
          // Handle other types of errors
          console.error("Error fetching cart items:", error);
        }
      }
    }
    fetchCartItems();
  }, [refresh]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/removefromcart`,
        { productId },
        { withCredentials: true }
      );
      alert("Product removed from cart");
      if (response.status === 200) {
        setRefresh(!refresh);
      } else {
        console.log("product not found in cart");
      }
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response ? error.response.data : error.message
      );
      console.error("Full error object:", error);
    }
  };
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/addtocart`,
        { productId, quantity: newQuantity },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setRefresh(!refresh);
      } else {
        console.log("quantity not updated");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Calculate total quantity and cost of all items in the cart
  const totalQuantity = cartproducts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalCost = cartproducts.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8">
      <Navbar />
      <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 text-gray-100">
        Your Cart
      </h1>
      {cartproducts.length === 0 ? (
        <p className="text-xl md:text-2xl text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 md:space-y-6">
            {cartproducts.map((item) => (
              <li
                key={item.product._id}
                className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-4 md:pb-6"
              >
                <div className="flex items-center space-x-4 md:space-x-6">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-200">
                      {item.product.name}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400">
                      ₹{item.product.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 md:space-x-6">
                  {/* Quantity controls */}
                  <button
                    onClick={() => handleQuantityChange(item.product._id, -1)}
                    className="bg-gray-800 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    -
                  </button>
                  <span className="text-lg md:text-xl font-medium text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.product._id, 1)}
                    className="bg-gray-800 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    +
                  </button>
                  {/* Remove item button */}
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="text-gray-400 hover:text-gray-300 text-lg md:text-xl transition duration-300"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Total quantity and cost bar */}
          <div className="mt-6 md:mt-8 bg-gray-800 p-4 rounded-lg">
            <p className="text-lg md:text-xl text-white font-medium">
              Total Quantity: {totalQuantity}
            </p>
            <p className="text-lg md:text-xl text-white font-medium">
              Total Cost: ₹{totalCost.toFixed(2)}
            </p>
          </div>
        </>
      )}
      {/* Add total and checkout button if needed */}
    </div>
  );
}

export default Cart;
