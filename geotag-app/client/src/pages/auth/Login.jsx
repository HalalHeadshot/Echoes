import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../data/animationData/polaroidLoop.json";

const Login = ({ onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    alert('Login functionality will be connected to backend later!');
  };

  return (
    <div className="h-[100vh] w-[100vw] relative flex items-center bg-[#264a92]">
      <div className="formDiv flex justify-start items-center w-fit h-[400px] transparent overflow-hidden">
        <Lottie animationData={animationData} loop={true} className="w-[50%] aspect-square overflow-hidden"/>;
      </div>
      {/* Right side login panel */}
      <div className="formDiv flex justify-center absolute z-10 h-full w-[50%] top-0 right-0 bg-gray-200 shadow-lg rounded-l-[30px]">
        <form
          onSubmit={handleSubmit}
          className="p-[30px] px-[50px] w-full max-[600px] h-full flex flex-col justify-center"
        >
          <p className="text-[2rem] font-semibold mb-[20px]">Sign In</p>

          {/* Email field */}
          <div className="flex mb-[20px]">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-200 border-b border-gray-400 p-[10px] w-full focus:outline-none"
            />
          </div>

          {/* Password field with toggle */}
          <div className="flex mb-[30px]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-gray-200 border-b border-gray-400 p-[10px] w-full focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-500 border-b border-gray-400 px-2"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 p-[10px] rounded-[10px] text-white font-semibold hover:bg-blue-600 transition"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center my-[30px]">
            <div className="h-[1px] bg-gray-400 w-full"></div>
            <p className="whitespace-nowrap px-[5px] text-gray-500">Or</p>
            <div className="h-[1px] bg-gray-400 w-full"></div>
          </div>

          {/* Google button */}
          <button
            type="button"
            className="border border-gray-400 p-[5px] hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>

          {/* Switch to Signup */}
          <p className="text-center text-[0.8rem] mt-[10px] text-gray-500">
            Don't have an Account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-500 hover:underline"
            >
              Create account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
