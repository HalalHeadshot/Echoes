import { useState,useEffect } from 'react';
import MemoryCard from '../components/Memories/MemoryCard';
import AddMemoryForm from '../components/Memories/AddMemoryForm';

import Navbar from '../components/Layout/Navbar';
import SplitText from "../components/Layout/SplitText";
import { useTheme } from "../context/ThemeContext";
import animationData from "../data/animationData/emptyAnimation.json";
import Lottie from "lottie-react";
import axios from "axios";

const MemoriesPage = () => {
  const { dark, setDark } = useTheme();
  const [memories, setMemories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);


  
  const BASE_URL=import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const handleDeleteMemory = async (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      setMemories(memories.filter((m) => m._id !== id));
      try {
       await axios.delete(`${BASE_URL}/api/memory/deletememory/${id}`,{withCredentials:true});
      }
      catch(err){
        console.error("Failed to delete memory:",err);
      }
    }
  };


  const handleEditMemory = async (updatedMemory) => { 
  try {
    //PATCH request to backend
    const res = await axios.patch(
      `${BASE_URL}/api/memory/editmemory/${updatedMemory._id}`,
      { title: updatedMemory.title, description: updatedMemory.description },
      { withCredentials: true }
    );

  
    setMemories(memories.map((m) =>
      m._id === updatedMemory._id ? res.data.memory : m
    ));
  } catch (err) {
    console.error("Failed to edit memory:", err);
  }
};
  

   useEffect(()=>{
   const fetchMemories=async()=>{
    try{
        const res= await axios.get(`${BASE_URL}/api/memory/fetchmemory`, {withCredentials: true });// credentials:true is crucial for sending cookies
        setMemories([...memories, ...(res.data.memories || [])]);
    }
    catch(err){
      console.error("Failed to fetch memories:",err);
    }
   }
   fetchMemories();
  },[]);

  return (
    <div className="bg-main dark:bg-dmain w-full min-h-screen flex flex-col px-[30px]">
      <Navbar />
      <div className="mt-[70px] flex flex-col justify-center items-center bg-main dark:bg-dmain  pb-[5px] pt-[15px]">
        {/* Header */}
        <div className="flex w-full mb-[20px] justify-between items-center">
          <div> { memories.length === 0 ?<></>:<>
            <SplitText
              text="My Memories"
              className="text-4xl font-bold mb-2 text-txt dark:text-dtxt"
              delay={0.1}                // delay before animation starts
              duration={0.6}             // animation duration per letter
              ease="power3.out"          // easing function
              splitType="chars"          // split into characters
              from={{ opacity: 0, y: 40 }} // starting state
              to={{ opacity: 1, y: 0 }}     // final state
              threshold={0.1}            // for IntersectionObserver trigger
              rootMargin="-100px"        // trigger before in viewport
              textAlign="center"
              onLetterAnimationComplete={() => {console.log("Animation finished!");console.log(self.chars);}}
            />
            <p className="text-lightTxt dark:text-dlightTxt">
              {memories.length}{' '}
              {memories.length === 1 ? 'memory' : 'memories'} saved
            </p></>}
          </div>
         
        </div>

        {/* Memories Grid */}
        {memories.length === 0 ? (
          <div className="pb-[10px] flex flex-col items-center  text-center w-full h-[100%]  rounded-lg">
            <Lottie animationData={animationData} loop={true} className="h-[250px] aspect-square overflow-hidden"/>
            <p className="text-txt dark:text-dtxt text-lg mb-4">No memories yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {memories.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onDelete={handleDeleteMemory}
                onEdit={handleEditMemory}
              />
            ))}
          </div>
        )}


      </div>
    </div>
  );
};

export default MemoriesPage;
