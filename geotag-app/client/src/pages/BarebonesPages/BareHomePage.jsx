 
 
 const BareHomePage = () => {
  
 return (
     <div className="h-[100vh] w-[100vw] relative flex items-center bg-main dark:bg-dmain text-[5rem]">
      
      <nav className="fixed top-0 left-0 right-0 z-[100] py-2 px-5 bg-main dark:bg-dmain">
         <div className="flex justify-between items-center h-12">
           {/* Logo placeholder */}
           <div className="w-10 h-10 bg-gray-300 dark:bg-[#191919]  rounded-full animate-pulse"></div>
       
           {/* Nav links placeholder */}
           <div className="flex absolute z-[200] left-1/2 -translate-x-1/2 space-x-3">
             <div className="w-20 h-6 bg-gray-300 dark:bg-[#191919] rounded-full animate-pulse"></div>
             <div className="w-20 h-6 bg-gray-300 dark:bg-[#191919] rounded-full animate-pulse"></div>
             <div className="w-20 h-6 bg-gray-300 dark:bg-[#191919] rounded-full animate-pulse"></div>
           </div>
       
           {/* Profile placeholder */}
           <div className="flex items-center space-x-2">
             <div className="w-[100px] h-[30px] bg-gray-300 dark:bg-[#191919] rounded-full animate-pulse"></div>
           
           </div>
         </div>
      </nav>

      <div className="map-skeleton"></div>
      <div className="fixed z-[100] bg-gray-300 dark:bg-[#191919] animate-pulse left-1/2 -translate-x-1/2 bottom-5 w-[300px] h-4 rounded-full"></div>
      <div className="absolute bottom-[15px] right-[10px] h-[60px] w-[30px] bg-gray-300 dark:bg-[#191919] rounded-sm animate-pulse"></div>
    </div>
 );
};

 export default BareHomePage;