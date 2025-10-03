import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { MoonStar,SunMedium,LogOut } from 'lucide-react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
   const [dark, setDark] = useState(true);

  return (
       <nav className="bg-white fixed w-full z-[999] top-0 px-[20px]">
        <div className="flex justify-between items-center h-[64px] relative z-10">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className='bg-[url("tempLogo2.png")] bg-contain bg-no-repeat aspect-[441/255] h-[50px]'></div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>

                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-black text-[1.2rem] px-[12px] py-[8px] text-sm font-medium ${
                      isActive ? "border-b-[2px] border-[#3d61f0]" : ""
                    }`
                  }
                >
                  Map
                </NavLink>
                
                <NavLink
                  to="/memories"
                  className={({ isActive }) =>
                    `text-black text-[1.2rem] px-[12px] py-[8px] text-sm font-medium ${
                      isActive ? "border-b-[2px] border-[#3d61f0]" : ""
                    }`
                  }
                >
                  Memories
                </NavLink>
                
                {/* <button
                  onClick={() => setIsLoggedIn(false)}
                    className="bg-red-500 text-white px-[16px] py-[8px] rounded-md text-sm font-medium hover:bg-red-600"
                >
                  Logout
                </button> */}
              </>
            ) : (
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white px-[16px] py-[8px] rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Login
                </Link>
            )}
          </div>

          <section className='flex items-center text-gray-600'>
            
          <button
           onClick={() => setDark(prev=>!prev)}>
            {(dark)?
            <MoonStar />:
            <SunMedium />
            }
          </button>

          <button className="ml-[20px]"
                  onClick={() => setIsLoggedIn(false)}
                   
                >
            <LogOut />
          </button>

          <div className="ml-[40px] aspect-square w-[40px] bg-gray-400 rounded-full flex justify-center items-end overflow-hidden">
                     <i className="fa-solid fa-user text-[1.8rem] text-gray-200"></i>
          </div>
          
          </section>

        </div>

    </nav>
  );
};

export default Navbar;