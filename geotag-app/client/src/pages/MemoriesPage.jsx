import { useState } from 'react';
import MemoryCard from '../components/Memories/MemoryCard';
import AddMemoryForm from '../components/Memories/AddMemoryForm';
import { mockMemories } from '../data/mockData';
import Navbar from '../components/Layout/Navbar';

const MemoriesPage = () => {
  const [memories, setMemories] = useState(mockMemories);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMemory = (newMemory) => {
    setMemories([newMemory, ...memories]); // Add to beginning of array
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-[70px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Memories
          </h1>
          <p className="text-gray-600">
            {memories.length} {memories.length === 1 ? 'memory' : 'memories'} saved
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Memory
        </button>
      </div>

      {/* Memories Grid */}
      {memories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No memories yet</p>
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
            <MemoryCard key={memory.id} memory={memory} />
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
    </>
  );
};

export default MemoriesPage;