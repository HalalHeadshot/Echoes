import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { MoonStar,SunMedium,LogOut,ChevronDown } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
   const [showProfileOptions, setShowProfileOptions] = useState(false);
   const { dark, setDark } = useTheme();

  return (
       <nav className="transparent backdrop-blur-lg fixed z-[999] top-[0px] py-[5px] left-0 right-0 px-[20px]">
        <div className="flex justify-between items-center h-[50px] relative z-10">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className='bg-[url("logo.png")] bg-contain bg-no-repeat aspect-[445/549] h-[40px]'></div>
          </Link>

          {/* Navigation Links */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-[12px] py-[5px] px-[5px] h-full bg-main/50 dark:bg-dborderColor/50 backdrop-blur-[2px] border-[1px] border-borderColor dark:border-dborderColor rounded-full">
                <NavLink to="/" className={({ isActive }) =>
                    `p-[5px] h-full flex items-center justify-center rounded-full text-[1.2rem] w-[80px] text-center
                     text-sm font-medium ${isActive ? 
                      "bg-dmain text-white dark:bg-main dark:text-black"
                      : 
                      "text-black dark:text-white"} 
                    `
                  }
                >
                  Map
                </NavLink>
                
                <NavLink to="/memories" className={({ isActive }) =>
                    `p-[5px] h-full flex items-center justify-center rounded-full text-[1.2rem] w-[80px] text-center
                     text-sm font-medium ${isActive ? 
                      "bg-dmain text-white dark:bg-main dark:text-black"
                      : 
                      "text-black dark:text-white"} 
                    `
                  }
                >
                  Memories
                </NavLink>

                <NavLink to="/timeline" className={({ isActive }) =>
                    `p-[5px] h-full flex items-center justify-center rounded-full text-[1.2rem] w-[80px] text-center
                     text-sm font-medium ${isActive ? 
                      "bg-dmain text-white dark:bg-main dark:text-black"
                      : 
                      "text-black dark:text-white"} 
                    `
                  }
                >
                  Timeline
                </NavLink>
                
                {/* <button
                  onClick={() => setIsLoggedIn(false)}
                    className="bg-red-500 text-white px-[16px] py-[8px] rounded-md text-sm font-medium hover:bg-red-600"
                >
                  Logout
                </button> */}
          </div>

          <section className='relative flex items-center text-black h-full bg-white/20 dark:bg-dborderColor/50 backdrop-blur-[2px] border-[1px]
           border-borderColor dark:border-dborderColor rounded-full' onMouseLeave={() => setShowProfileOptions(false)}>      
             
   
             <div className="overflow-hidden flex w-[50px] h-full bg-main/50 dark:bg-dborderColor/50 backdrop-blur-[2px] rounded-full hover:w-[200px] transition-all duration-300">           
                 <div className="aspect-square min-w-[50px] border-[1px] bg-gray-400 dark:bg-[#393939] dark:border-dmain rounded-full flex justify-center items-end overflow-hidden">
                     <i className="fa-solid fa-user text-[2rem] text-gray-200 dark:text-gray-400"></i>
                 </div>
  
                 <div className="p-[5px] w-full flex justify-between">
                     <section className="flex flex-col justify-center">
                       <p className='text-[0.9rem] text-txt dark:text-dtxt'>Username</p>
                       <p className='text-[0.6rem] text-lightTxt dark:text-dlightTxt'>sample@gmail.com</p>
                     </section>
                     <button className="flex items-center justify-center text-txt dark:text-dtxt h-full p-[5px] border-l-[1px] border-[#565656]"
                       onClick={() => setShowProfileOptions(prev => !prev)}>
                       <ChevronDown/>
                     </button>
                 </div>      
             </div>

            {(showProfileOptions)?
              <div className="profileOptions absolute top-[50px] rounded-md right-[0px] h-fit w-fit bg-white/95 dark:bg-dborderColor/95 backdrop-blur-md border-[1px]
           border-borderColor dark:border-dborderColor shadow-lg p-[5px]">
                  <button className="text-[0.9rem] h-full flex py-[5px] w-full text-lightTxt dark:text-dlightTxt"
                   onClick={() => setDark(prev => !prev)}>
                    {(!dark)?
                    <section className="flex w-full justify-start"><MoonStar className='scale-[0.8]'/><p className='pl-[5px] flex justify-start whitespace-nowrap w-[90px]'>Dark mode</p></section>:
                    <section className="flex w-full justify-start"><SunMedium className='scale-[0.8] w-fit' /><p className='pl-[5px] flex justify-start whitespace-nowrap  w-[90px]'>Light mode</p></section>
                    }
                  </button>
        
                  <button className="text-[0.9rem] h-full flex  justify-start py-[5px] border-t-[1px] border-borderColor dark:border-dborderColor text-lightTxt dark:text-dlightTxt w-full"
                          onClick={() => setIsLoggedIn(false)} >
                    <LogOut className='scale-[0.8]' /><p className='pl-[5px] whitespace-nowrap w-[90px] flex justify-start'>Log Out</p>
                  </button>
             </div>
             :
             <></>
            }       
          </section>

        </div>

    </nav>
  );
};

export default Navbar;