import { Pencil, Trash, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MemoryCard = ({ memory, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMemory, setEditedMemory] = useState(memory);

  // 🗓 Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const handleViewOnMap = () => {
    navigate('/'); 
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleSave = () => {
    onEdit(editedMemory);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      onDelete(memory.id);
    }
  };

  return (
    <div className="bg-lightMain dark:bg-dlightMain rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Photo */}
      <img
        src={memory.photoUrl}
        alt={memory.title}
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedMemory.title}
              onChange={(e) =>
                setEditedMemory({ ...editedMemory, title: e.target.value })
              }
              className="w-full mb-2 rounded-lg p-2 border-[1px] border-dborderColor dark:border-borderColor text-txt dark:text-dtxt bg-lightMain dark:bg-dlightMain focus:outline-none"
            />
            <textarea
              value={editedMemory.description}
              onChange={(e) =>
                setEditedMemory({
                  ...editedMemory,
                  description: e.target.value
                })
              }
              className="w-full mb-3 rounded-lg p-2 border-[1px] border-dborderColor dark:border-borderColor text-txt dark:text-dtxt bg-lightMain dark:bg-dlightMain focus:outline-none"
              rows="3"
            />
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-txt dark:text-dtxt mb-2">
              {memory.title}
            </h3>
            <p className="text-lightTxt dark:text-dlightTxt mb-4 line-clamp-3">
              {memory.description}
            </p>
          </>
        )}

        <div className="flex items-center text-sm text-blue-500 dark:text-blue-400 mb-2">
          <span className="mr-2">
            <MapPin size={16} />
          </span>
          <span>{memory.location.address}</span>
        </div>

        <div className="flex items-center text-sm text-purple-500">
          <span className="mr-2">
            <Calendar size={16} />
          </span>
          <span>{formatDate(memory.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleViewOnMap}
            className="flex-1 bg-main dark:bg-dmain text-txt dark:text-dtxt py-2 rounded-lg hover:text-dtxt hover:bg-dmain  dark:hover:text-txt dark:hover:bg-main transition"
          >
            View on Map
          </button>
        )}

        <button
          onClick={handleEditClick}
          className="px-4 bg-blue-200 text-blue-500 rounded-lg hover:bg-gray-300 transition"
          disabled={isEditing}
        >
          <Pencil />
        </button>

        <button
          onClick={handleDelete}
          className="px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default MemoryCard;
