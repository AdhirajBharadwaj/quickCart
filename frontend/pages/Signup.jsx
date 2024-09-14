import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
function Signup() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = axios.post(
        "https://quickcart-zow4.onrender.com/api/user/register",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Signup successful");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("No response from server");
      } else {
        alert("Error");
      }
    }
  };
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-700 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Signup
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username input field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Email input field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Signup button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Signup
          </button>
        </form>
        {/* Login link */}
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
