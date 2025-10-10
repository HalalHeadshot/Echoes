import { useState } from 'react';
import MemoryCard from '../components/Memories/MemoryCard';
import AddMemoryForm from '../components/Memories/AddMemoryForm';
import { mockMemories } from '../data/mockData';
import Navbar from '../components/Layout/Navbar';
import { useTheme } from "../context/ThemeContext";
import animationData from "../data/animationData/emptyAnimation.json";
import Lottie from "lottie-react";

const MemoriesPage = () => {
  const { dark, setDark } = useTheme();
  const [memories, setMemories] = useState(mockMemories);
  const [showAddForm, setShowAddForm] = useState(false);


  const handleAddMemory = (newMemory) => {
    setMemories([newMemory, ...memories]); 
  };


  const handleDeleteMemory = (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      setMemories(memories.filter((m) => m.id !== id));
    }
  };


  const handleEditMemory = (updatedMemory) => {
    setMemories(
      memories.map((m) => (m.id === updatedMemory.id ? updatedMemory : m))
    );
  };

  return (
    <div className="bg-main dark:bg-dmain w-full min-h-screen flex flex-col px-[30px]">
      <Navbar />
      <div className="mt-[70px] flex-1 bg-main dark:bg-dmain  pb-[5px] pt-[15px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-txt dark:text-dtxt mb-2">
              My Memories
            </h1>
            <p className="text-lightTxt dark:text-dlightTxt">
              {memories.length}{' '}
              {memories.length === 1 ? 'memory' : 'memories'} saved
            </p>
          </div>
          { memories.length === 0 ?
          <></> : 
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Memory
          </button>
          }
        </div>

        {/* Memories Grid */}
        {memories.length === 0 ? (
          <div className="pb-[10px] flex flex-col items-center text-center w-full h-[100%] border-dashed border-[2px] border-borderColor dark:border-dborderColor rounded-lg">
            <Lottie animationData={animationData} loop={true} className="h-[250px] aspect-square overflow-hidden"/>
            <p className="text-txt dark:text-dtxt text-lg mb-4">No memories yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add Your First Memory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Add Memory Modal */}
        {showAddForm && (
          <AddMemoryForm
            onClose={() => setShowAddForm(false)}
            onAdd={handleAddMemory}
          />
        )}
      </div>
    </div>
  );
};

export default MemoriesPage;
