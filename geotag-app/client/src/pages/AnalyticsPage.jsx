import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Navbar from '../components/Layout/Navbar';
import GradientText from '../components/Layout/GradientText';
import Tooltip from "../components/Layout/Tooltip";
import { CircleQuestionMark } from 'lucide-react';
import React from "react";
import PackedBubble from "../components/Charts/PackedBubble";
import BarChart from "../components/Charts/BarChart";
import { useState,useEffect, useRef } from "react";
import { gsap } from "gsap";
import Aurora from '../components/Layout/Aurora';
  


const AnalyticsPage = () => {
const sampleBubbles = [
  { name: "Food", value: 12 },
  { name: "Events", value: 8 },
  { name: "Nature", value: 6 },
  { name: "Cultural", value: 4 },
  { name: "Casual", value: 4 },
  { name: "People", value: 3 },
  { name: "Travel", value: 2 },
  { name: "Adventure", value: 2 },
  { name: "Off Grid", value: 1 },
];

const sampleBars = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 60 },
  { name: "May", value: 20 },
  { name: "Jun", value: 90 },
  { name: "Jul", value: 30 },
  { name: "Aug", value: 80 },
  { name: "Sep", value: 45 },
  { name: "Oct", value: 60 },
  { name: "Nov", value: 20 },
  { name: "Dec", value: 90 },
];
const count=34;
const countRef = useRef(null);

const [animatedCount, setAnimatedCount] = useState(0);

useEffect(() => {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: count,
    duration: 1,
    ease: "power1.out",
    onUpdate: () => setAnimatedCount(Math.floor(obj.val))
  });
}, [count]);


   const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  // Observe dark mode dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setSize({ width, height: width * 0.75 }); // 4:3 aspect ratio, adjust as needed
      }
    };

    updateSize(); // initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

return (
   <div className='relative w-full'>
      { isDark?
    <Aurora  className=" bg-black h-[800px]" colorStops={["#fc9b41", "#d557e3", "#3ed8e3"]} blend={2.0} amplitude={2.0} speed={0.5}/>
      :
      <div className=" bg-lin w-full h-[150px]"
     ></div>
   }
     <div className="w-full min-h-screen bg-main dark:bg-dmain px-[30px] ">
      
       <Navbar />

        <section data-label='memCountSection' className='z-[10] top-[70px] absolute text-center h-fit left-[30px] right-[30px] mt-[0px] mb-[20px] p-[20px] border-[1px] shadow-lg border-borderColor dark:border-dborderColor text-txt dark:text-dtxt rounded-xl bg-[#f3f3f3] dark:bg-[#28282884]'>
               <p className='figtree text-[3rem] flex justify-center'>
                   Memories This year:&nbsp;
                 <GradientText colors={["#fc9b41ff", "#d557e3ff", "#3ed8e3ff"]} animationSpeed={5} showBorder={false} className="w-fit text-[3rem]" ref={countRef}>
                   {animatedCount}
                 </GradientText>
               </p>

        </section>

       <section data-label='graphSection' className='flex flex-wrap justify-between h-fit w-full pt-[50px]'>

          <div  ref={containerRef} className="w-[49.3%] p-[20px] bg-[#f3f3f3] border-[1px] shadow-lg border-borderColor dark:border-dborderColor dark:bg-[#171717] rounded-xl">
             <PackedBubble data={sampleBubbles}  width={size.width}  height={size.height}  />
          </div>

          <div className=" flex items-center w-[49.3%] p-[20px] bg-[#f3f3f3] border-[1px] shadow-lg border-borderColor dark:border-dborderColor dark:bg-[#171717] rounded-xl">
            <BarChart data={sampleBars} />
          </div>

       </section>

        <section data-label='AchievementsSection ' className='h-fit w-full py-[40px] text-txt dark:text-dtxt'>
           <p className='figtree text-[3rem]'>Achievements progress</p>
           
           <section data-label='foodieProgress' className='py-[30px] w-full h-fit'>
            <Tooltip   text={`Earned by adding food related memoeries\nL1: 5 memories\nL2: 10 memories\nL3: 15+ memoeries`} position='right'>
            <p className="flex">Foodie&nbsp;<div className='text-borderColor dark:text-dborderColor'><CircleQuestionMark /></div></p>
            </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[80%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>

            <section data-label='natureProgress' className='py-[30px] w-full h-fit border-t-[1.5px] border-borderColor border-dotted dark:border-dborderColor'>
            <Tooltip   text={`Earned addingmemoeries at nature destinations like hills, beaches, forests, or lakes. \nL1: 3 memories \nL2: 7 memories \nL3: 12+ memories`} position='right'>
            <p className="flex">Nature Lover&nbsp;<div className="text-borderColor dark:text-dborderColor"><CircleQuestionMark /></div></p>
            </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>


           <section data-label='historyProgress' className='py-[30px] w-full h-fit border-t-[1.5px] border-lightMain2 border-dotted dark:border-dborderColor'>
             <Tooltip   text={`Earned by adding memories at historical monuments, museums, or cultural festivals.\nL1: 3 memories\nL2: 6 memories\nL3: 10+ memories`} position='right'>
            <p className="flex">Culture Seeker&nbsp;<div className="text-borderColor dark:text-dborderColor"><CircleQuestionMark /></div></p>
            </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>


           <section data-label='eventProgress' className='py-[30px] w-full h-fit border-t-[1.5px] border-lightMain2 border-dotted dark:border-dborderColor'>
             <Tooltip   text={`Earned by adding memories at a concerts, exhibitions, fairs, weddings, or community gatherings.\nL1: 3 memories\nL2: 6 memories\nL3: 10+ memories`} position='right'>
            <p className="flex">Event enthusiast&nbsp;<div className="text-borderColor dark:text-dborderColor"><CircleQuestionMark /></div></p>
            </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>


           
           
           <section data-label='globeTrotProgress' className='py-[30px] w-full h-fit border-t-[1.5px] border-borderColor border-dotted dark:border-dborderColor'>
             <Tooltip text={`Earned by adding memories in countries outside your homeland\nL1: 1 memory\nL2: 3 memories\nL3: 5+ memories`} position="right">
             <p className="flex">Global Trotter&nbsp;<div className="text-borderColor dark:text-dborderColor"><CircleQuestionMark /></div></p>
             </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[80%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>


            <section data-label='stateProgress' className='py-[30px] w-full h-fit border-t-[1.5px] border-borderColor border-dotted dark:border-dborderColor'>
            <Tooltip   text={`Earned by adding memories across states within your country.\nL1: 5 memories\nL2: 10 memories\nL3: 20+ memories`} position='right'>
            <p className="flex">National Nomad&nbsp;<div className="text-borderColor dark:text-dborderColor"><CircleQuestionMark /></div></p>
            </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>



           <section data-label='localProgress' className='py-[30px] w-full h-fit border-t-[1.5px] border-borderColor border-dotted dark:border-dborderColor'>
             <Tooltip   text={`Earned by adding memories at local places like cafes, landmarks, or hidden corners in your city.\nL1: 5 memories\nL2: 10 memories\nL3: 15+ memories`} position='right'>
            <p className="flex">Local Explorer&nbsp;<div className="text-borderColor dark:text-dborderColor"><CircleQuestionMark /></div></p>
            </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>


           <section data-label='offGridProgress' className='py-[30px] w-full h-fit border-t-[1.5px] border-borderColor border-dotted dark:border-dborderColor'>
            <Tooltip   text={`Earned by adding memories in remote or offbeat places away from the city life.\nL1: 2 memories\nL2: 5 memories\nL3: 8+ memories`} position='right'>
            <p className="flex">Off Grid&nbsp;<div className="text-borderColor dark:text-dborderColor"><CircleQuestionMark /></div></p>
            </Tooltip>
            <div className="w-full py-[10px] h-fit flex justify-between">
               
               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L1</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L2</p>
                <div className="w-[100%] h-full bg-gradient-main"></div>
               </div>

               <div className='rounded-full h-[20px] w-[32%] bg-lightMain2 dark:bg-dlightMain2 font-semibold overflow-hidden relative'>
                <p className='w-full absolute z-[5] text-center text-white font-bold text-[0.8rem]'>L3</p>
               </div>
            
            </div>
           </section>

           
           
       </section>
                        
    </div>
     </div>
);
}
export default AnalyticsPage;