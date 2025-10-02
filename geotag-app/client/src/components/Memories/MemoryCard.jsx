const MemoryCard = ({ memory }) => {
  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Photo */}
      <img
        src={memory.photoUrl}
        alt={memory.title}
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {memory.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {memory.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-2">📍</span>
          <span>{memory.location.address}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">📅</span>
          <span>{formatDate(memory.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          View on Map
        </button>
        <button className="px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
          ✏️
        </button>
        <button className="px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default MemoryCard;