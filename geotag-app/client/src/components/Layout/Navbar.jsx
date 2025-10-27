import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { MoonStar,SunMedium,LogOut,ChevronDown,User,ChartNoAxesColumn, MapPinHouse } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import { useHome } from '../../context/HomeContext';
import Modal from "./Modal";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   const navigate = useNavigate();
   const { homePosition } = useHome();
   const { dark, setDark } = useTheme();

   const [showProfileOptions, setShowProfileOptions] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [name,setName]=useState("");
   const [email,setEmail]=useState("");
   const [address,setAddress]=useState("");
   const [profilePic,setProfilePic]=useState("");
  const [addrLoading, setAddrLoading] = useState(false);

    const BASE_URL=import.meta.env.VITE_BASE_URL || "http://localhost:5000";
   //run when component mounts
   useEffect(()=>{
    const fetchUser = async () => {
    
      try{
        const res=await axios.get(`${BASE_URL}/api/user/navbar`,{ withCredentials: true });
        setName(res.data.name);
        setEmail(res.data.email);
        setProfilePic(res.data.profilePic);
      }
      catch(err){
        console.error("Error fetching user data:", err.response?.data || err.message);
        setName("");
        setEmail("");
        setProfilePic("");
      }
    };
    
    fetchUser();     
   },[]);
   

   useEffect(() => {
  const fetchAddress = async () => {
    if (!homePosition || !homePosition.lat || !homePosition.lng) return;

    try {
      setAddrLoading(true);

      // Nominatim reverse geocoding
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
        homePosition.lat
      )}&lon=${encodeURIComponent(homePosition.lng)}&accept-language=en`;

      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'EchoesGeotagApp/1.0 (your-email@example.com)'
        }
      });

      if (res.data && res.data.display_name) {
        // Terms to filter out
        const unwantedTerms = [
          'taluka', 
          'tehsil', 
          'subdivision',
          'ward',
          'zone',
          'suburban'
        ];
        
        // Clean duplicates and filter unwanted terms
        const parts = res.data.display_name.split(",").map(p => p.trim());
        const seen = new Set();
        const cleaned = [];

        for (let part of parts) {
          const lower = part.toLowerCase();
          
          // Check if part contains any unwanted term
          const hasUnwantedTerm = unwantedTerms.some(term => 
            lower.includes(term)
          );
          
          if (!seen.has(lower) && !hasUnwantedTerm) {
            cleaned.push(part);
            seen.add(lower);
          }
        }

        setAddress(cleaned.join(", "));
      } else if (res.data && res.data.address) {
        setAddress(JSON.stringify(res.data.address));
      } else {
        setAddress("");
      }
    } catch (err) {
      console.error('Nominatim reverse geocode error:', err.response?.data || err.message || err);
      setAddress("");
    } finally {
      setAddrLoading(false);
    }
  };

  fetchAddress();
}, [homePosition]);
  

   const logOutUser = async () => {
   try {
      await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate('/');
    }
   catch (err) {
    console.error("Error logging out:", err.response?.data || err.message);
   }
   };


   const handlehomeLocation=()=>{
    navigate('/homelocation');
   };

 


  return (
       <nav className="transparent backdrop-blur-lg fixed z-[999] top-[0px] py-[5px] left-0 right-0 px-[20px]">
        <div className="flex justify-between items-center h-[50px] relative z-10">
          {/* Logo/Brand */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className='bg-[url("logo.png")] bg-contain bg-no-repeat aspect-[445/549] h-[40px]'></div>
          </Link>

          {/* Navigation Links */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-[12px] py-[5px] px-[5px] h-full bg-main/50 dark:bg-dborderColor/50 backdrop-blur-[2px] border-[1px] border-borderColor dark:border-dborderColor rounded-full">
                <NavLink to="/home" className={({ isActive }) =>
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

         <div className='w-fit h-[50px] flex'>
         
         <button onClick={handlehomeLocation} className="flex text-borderColor scale-[1.2] dark:text-dlightTxt items-center justify-center h-full w-full mr-5">
           < MapPinHouse/>
         </button>
         
         <button onClick={() => setDark(prev => !prev)} className="flex text-borderColor dark:text-dlightTxt items-center justify-center h-full w-full mr-5">
           {dark ? (
             <SunMedium className="scale-[1.2] transition-all duration-300" />
           ) : (
             <MoonStar className="scale-[1.2] transition-all duration-300" />
           )}
         </button>

         

          <section className='relative flex items-center text-black h-full bg-white/20 dark:bg-dborderColor/50 backdrop-blur-[2px] border-[1px]
           border-borderColor dark:border-dborderColor rounded-full' onMouseLeave={() => setShowProfileOptions(false)}>      
             
   
             <div className="overflow-hidden flex w-[50px] h-full bg-main/50 dark:bg-dborderColor/50 backdrop-blur-[2px] rounded-full hover:w-[200px] transition-all duration-300">           
                 {profilePic?
                
                  <img src={profilePic} alt="pfp" className="w-[50px] h-[50px] rounded-full object-cover"/>

                 :
                 <div className="aspect-square min-w-[50px] border-[1px] bg-gray-400 dark:bg-[#393939] dark:border-dmain rounded-full flex justify-center items-end overflow-hidden">
                     <i className="fa-solid fa-user text-[2rem] text-gray-200 dark:text-gray-400"></i>
                 </div>
                 }
                 
  
                 <div className="p-[5px] w-full flex justify-between">
                     <section className="flex flex-col justify-center">
                       <p className='text-[0.9rem] text-txt dark:text-dtxt'>{`${(name?.length)>10?name.slice(0,9)+"...":name}`}</p>
                       <p className='text-[0.6rem] text-lightTxt dark:text-dlightTxt'>{`${email?.length>18?email.slice(0,17)+"...":email}`}</p>
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
                  
                   <button className="text-[0.9rem] h-full flex  justify-start py-[5px] text-lightTxt dark:text-dlightTxt w-full"
                   onClick={() => setOpenModal(true)}>
                    <User className='scale-[0.8]' /><p className='pl-[5px] whitespace-nowrap w-[90px] flex justify-start'>Profile</p>
                  </button>

                      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                        <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden">
                        {/* Cover image */}
                        <div className=" h-20 w-full bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 relative">
                         
                        </div>
                      
                        {/* Profile section */}
                        <div className="px-6 pb-6">
                          {/* Profile picture and buttons */}
                          <div className="flex items-start justify-between -mt-16 mb-4">
                            { profilePic? 
                              <img src={profilePic} alt="pfp" className="w-32 h-32 z-[10] border-[5px] dark:border-[#1a1a1a] border-main  rounded-full object-cover"/>
                            :       
                            <div className="z-[10] absoulte w-32 h-32 rounded-full border-4 border-white dark:border-[#1a1a1a] overflow-hidden bg-gray-300 flex items-center justify-center">
                              <i className="fa-solid fa-user text-5xl text-gray-500"></i>
                            </div>
                            }
                            
                            
                          </div>
                      
                          {/* Name and info */}
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{`${name.length>20?name.slice(0,19)+"...":name}`}</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{`${email.length>40?email.slice(0,49)+"...":email}`}</p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm">{address}</p>
                          </div>
                      
                          {/* Current role badge */}
                          <div className="mb-6 flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400 text-sm">Achievemnts Unlocked:</span>
                            <i className="fa-solid fa-briefcase text-gray-400 text-xs"></i>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                              -------
                            </span>
                          </div>                 
                        </div>
                      </div>
                  </Modal>
                  
                   <NavLink to="/analytics" className='text-[0.9rem] h-full flex py-[5px] w-full border-t-[1px] border-borderColor dark:border-dborderColor text-lightTxt dark:text-dlightTxt'>
                      <ChartNoAxesColumn className='scale-[0.8]' /><p className='pl-[5px] whitespace-nowrap w-[90px] flex justify-start'>Analytics</p>
                   </NavLink>

                  
        
                  <button className="text-[0.9rem] h-full flex  justify-start py-[5px] border-t-[1px] border-borderColor dark:border-dborderColor text-lightTxt dark:text-dlightTxt w-full"
                          onClick={logOutUser} >
                    <LogOut className='scale-[0.8]' /><p className='pl-[5px] whitespace-nowrap w-[90px] flex justify-start'>Log Out</p>
                  </button>
             </div>
             :
             <></>
            }       
          </section>
          </div>

        </div>

    </nav>
  );
};

export default Navbar;