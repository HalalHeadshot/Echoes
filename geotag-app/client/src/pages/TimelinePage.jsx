import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import Navbar from '../components/Layout/Navbar';
import GlareHover from '../components/Layout/GlareHover';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockMemories } from '../data/mockData';

const TimelinePage = () => {
  const { dark } = useTheme();
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();

  const carouselRefs = useRef([...Array(12)].map(() => React.createRef()));
  const monthRefs = useRef([...Array(12)].map(() => React.createRef()));

  //State to track overflow for each month carousel
  const [hasOverflow, setHasOverflow] = useState(Array(12).fill(false));

  // Check overflow after initial render
  useEffect(() => {
    const overflowStatus = carouselRefs.current.map(ref => {
      const el = ref.current;
      if (!el) return false;
      return el.scrollWidth > el.clientWidth;
    });
    setHasOverflow(overflowStatus);
  }, []);

  // Scroll to current month on mount
  useEffect(() => {
    const currentMonthDiv = monthRefs.current[currentMonthIndex].current;
    if (currentMonthDiv) {
      currentMonthDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentMonthIndex]);

  const scrollCarousel = (monthIndex, direction) => {
    const carousel = carouselRefs.current[monthIndex].current;
    if (carousel) {
      const scrollAmount = 200;
      carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  // Group memories by month
  const memoriesByMonth = Array.from({ length: 12 }, () => []);
  mockMemories.forEach(memory => {
    const monthIndex = new Date(memory.createdAt).getMonth();
    memoriesByMonth[monthIndex].push(memory);
  });

  return (
    <div className="bg-main dark:bg-dmain w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="w-full flex ">
        {/* Left Timeline */}
        <section className="sidebarSection  w-[17%] max-w-[200px] bg-main dark:bg-dmain min-h-screen flex flex-col">
          <div
            data-label="year section"
            className="archivo leading-none w-full text-txt dark:text-dtxt text-[2.5rem] h-[130px] pb-[20px] pt-[70px] flex justify-center"
          >
            {currentYear}
          </div>

          <section className="w-full flex">
            {/* Month labels */}
            <section className="w-[70%] flex flex-col px-[10px]">
              <div
                data-label="month section"
                className="w-full flex flex-col items-end text-txt dark:text-dtxt"
              >
                {[
                  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
                ].map((month, i) => (
                  <div
                    key={i}
                    className="w-fit h-[20px] mb-[200px] leading-none flex items-center"
                  >
                    {month}&nbsp;
                    <p className="text-[0.7rem] text-lightTxt dark:text-dlightTxt">
                      {` [${memoriesByMonth[i].length}]`}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Circles + lines */}
            <section className="w-[30%] flex flex-col items-center pb-[20px]">
              <div className="flex flex-col items-center">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      data-label="circle"
                      className={`w-[20px] aspect-square rounded-full border-[2px] flex items-center justify-center ${
                        i === currentMonthIndex
                          ? 'border-orangeMain'
                          : 'border-borderColor dark:border-dborderColor'
                      }`}
                    >
                      <div
                        data-label="inner circle"
                        className={`w-[10px] aspect-square rounded-full ${
                          i === currentMonthIndex
                            ? 'bg-orangeMain'
                            : 'bg-transparent'
                        }`}
                      ></div>
                    </div>

                    {i < 11 && (
                      <div
                        data-label="vertLine"
                        className={`h-[200px] ${
                          i === currentMonthIndex
                            ? 'bg-gradient-to-b from-orangeMain via-pinkMain to-cyanMain w-[5px]'
                            : 'bg-borderColor dark:bg-dborderColor w-[2px]'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </section>
        </section>

        {/* Right Timeline */}
        <section className="timelineSection w-[83%] flex-1 bg-lightMain dark:bg-dslightLightMain min-h-screen flex flex-col pt-[130px]">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i}>
              <div
                data-label="line container"
                className="w-full h-[20px] flex items-center px-[20px]"
              >
                <div
                  data-label="line"
                  className='w-full h-[2px] rounded bg-lightMain2 dark:bg-dlightMain'
                ></div>
              </div>

              {/* Month container with carousel */}
              <div
                ref={monthRefs.current[i]}
                data-label="month container"
                className={`w-full h-[200px] flex items-start px-[40px] relative`}
              >
                {/* Left scroll button - only if overflow */}
                {hasOverflow[i] && (
                  <button
                    className="absolute z-[50] left-5 top-[calc(40%+10px)] -translate-y-1/2 rounded-full flex items-center justify-center aspect-square w-[30px] bg-dmain dark:bg-main text-dtxt dark:text-txt shadow-md"
                    onClick={() => scrollCarousel(i, -1)}
                  >
                    <ChevronLeft />
                  </button>
                )}

                {/* Right scroll button - only if overflow */}
                {hasOverflow[i] && (
                  <button
                    className="absolute z-[50] right-5 top-[calc(40%+10px)] -translate-y-1/2 rounded-full flex items-center justify-center aspect-square w-[30px] bg-dmain dark:bg-main text-dtxt dark:text-txt shadow-md"
                    onClick={() => scrollCarousel(i, 1)}
                  >
                    <ChevronRight />
                  </button>
                )}

                {/* Scrollable carousel */}
                <section
                  ref={carouselRefs.current[i]}
                  data-label="image carousel container"
                  className=" w-full h-full flex space-x-3 overflow-hidden scrollbar-hide"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {memoriesByMonth[i].length > 0 ? (
                    memoriesByMonth[i].map((memory, idx) => {
                      //Array of color themes for pins
                      const pinColors = [
                        { head: 'from-red-500 to-red-800', inner: 'bg-red-900', stem: 'bg-red-950' },
                        { head: 'from-blue-500 to-blue-800', inner: 'bg-blue-900', stem: 'bg-blue-950' },
                        { head: 'from-green-500 to-green-800', inner: 'bg-green-900', stem: 'bg-green-950' },
                        { head: 'from-yellow-400 to-yellow-600', inner: 'bg-yellow-700', stem: 'bg-yellow-800' },
                        { head: 'from-pink-500 to-pink-800', inner: 'bg-pink-900', stem: 'bg-pink-950' },
                        { head: 'from-purple-500 to-purple-800', inner: 'bg-purple-900', stem: 'bg-purple-950' },
                      ];
                  
                       // Pick a random color
                      const color = pinColors[Math.floor(Math.random() * pinColors.length)];
                  
                      const options = [-0.5, 0, 0.5];
                      const rotation = options[Math.floor(Math.random() * options.length)];
                  
                        return (
                       <GlareHover
                       glareOpacity={0.3}
                       glareAngle={-30}
                       glareSize={300}
                       transitionDuration={900}
                       playOnce={false}
                       glareColor="#ffffff">
                            <article
                              key={memory.id}
                              data-label="image container"
                              className="relative h-[200px] p-[8px] w-[200px] border-[1px] shadow-custom-dark-lg border-lightMain2 bg-main dark:bg-dtxt overflow-hidden"
                              style={{ transform: `rotate(${rotation}deg)` }}
                              >
                              {/* Push Pin */}
                              <div className="absolute z-[10] flex flex-col items-center left-1/2 -translate-x-1/2 top-[6px] pointer-events-none">
                                {/* Pin head */}
                                <div
                                  className={`relative flex items-center justify-center bg-gradient-to-b ${color.head} rounded-full shadow-md w-[18px] aspect-square`}
                                >
                                  {/* Inner dome */}
                                  <div className={`${color.inner} w-[8px] aspect-square rounded-full shadow-inner`}></div>
                                  {/* Highlight */}
                                  <div className="absolute top-[3px] left-[4px] w-[4px] h-[4px] bg-white/60 rounded-full"></div>
                                </div>
                                {/* Pin stem */}
                                <div className={`w-[3px] h-[4px] ${color.stem} rounded-b-full`}></div>
                                {/* Drop shadow */}
                                <div className="w-[8px] h-[6px] bg-black/30 blur-[2px] rounded-full"></div>
                              </div>
                          
                              {/* Image */}
                              <img
                                src={memory.photoUrl}
                                alt={memory.title}
                                className="w-full h-[85%] object-cover"
                              />
                            </article>
                          </GlareHover>
                        );
                      })
                    ) : (
                      <p className="text-lightTxt dark:text-dlightTxt text-sm">
                        No memories this month
                      </p>
                    )}
                </section>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
     
  );
};

export default TimelinePage;
