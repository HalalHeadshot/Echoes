import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';

const Signup = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    console.log('Signup attempt:', formData);
    alert('Signup functionality will be connected to backend later!');
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-gray-100 relative">
      <div className="formDiv absolute h-full w-[50%] right-0 bg-gray-200 shadow-lg rounded-l-[30px]">
        <form
          onSubmit={handleSubmit}
          className="p-[30px] px-[50px] w-full h-full flex flex-col justify-center"
        >
          <p className="text-[2rem] font-semibold mb-[20px]">Create Account</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="flex gap-[20px] mb-[10px]">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-200 border-b border-gray-400 p-[10px] w-full focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex mb-[10px]">
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

          {/* Password + Confirm Password */}
          <div className="flex flex-col gap-[10px] mb-[30px]">
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="bg-gray-200 border-b border-gray-400 p-[10px] w-full focus:outline-none"
              />
              <button
                type="button"
                className="text-gray-500 border-b border-gray-400 px-2 focus:outline-none"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="bg-gray-200 border-b border-gray-400 p-[10px] w-full focus:outline-none"
            />
            <button
                type="button"
                className="text-gray-500 border-b border-gray-400 px-2 focus:outline-none"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
              </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 p-[10px] rounded-[10px] text-white font-semibold hover:bg-blue-600 transition"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-[30px]">
            <div className="h-[1px] bg-gray-400 w-full"></div>
            <p className="whitespace-nowrap px-[5px] text-gray-500">Or</p>
            <div className="h-[1px] bg-gray-400 w-full"></div>
          </div>

          {/* Google */}
          <button type="button" className="border border-gray-400 p-[5px] hover:bg-gray-100 transition">
            Continue with Google
          </button>

          {/* Switch to Login */}
          <p className="text-center text-[0.8rem] mt-[10px] text-gray-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-500 hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
