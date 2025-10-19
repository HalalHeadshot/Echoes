import { useState } from 'react';

const AddMemoryForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    photoUrl: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMemory = {
      id: Date.now().toString(), // Temporary ID
      title: formData.title,
      description: formData.description,
      location: {
        coordinates: [
          parseFloat(formData.longitude),
          parseFloat(formData.latitude)
        ],
        address: formData.address
      },
      photoUrl: formData.photoUrl,
      createdAt: new Date().toISOString()
    };

    onAdd(newMemory);
    onClose();
  };

  return (
    <div className="fixed z-[999] inset-0 backdrop-blur-[10px] bg-dborderColor/50 flex items-center justify-center p-4 ">
      <div className="rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-hidden">
        <div className="p-6 bg-main dark:bg-dlightMain">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-txt dark:text-dtxt">Add New Memory</h2>
            <button
              onClick={onClose}
              className="text-dlightTxt hover:text-txt dark:hover:text-dtxt text-[2rem]"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lightTxt dark:text-dlightTxt mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Beach Sunset"
                className="bg-lightMain dark:bg-dlightMain w-full px-4 py-2 border-[2px] border-borderColor dark:border-dborderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lightTxt dark:text-dlightTxt mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe your memory..."
                className="bg-lightMain dark:bg-dlightMain w-full px-4 py-2 border-[2px] border-borderColor dark:border-dborderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lightTxt dark:text-dlightTxt mb-1">
                Photo URL
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                required
                placeholder="https://example.com/photo.jpg"
                className="bg-lightMain dark:bg-dlightMain w-full px-4 py-2 border-[2px] border-borderColor dark:border-dborderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                For now, use image URLs. We'll add file upload later!
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-lightTxt dark:text-dlightTxt mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Santa Monica Beach, CA"
                className="bg-lightMain dark:bg-dlightMain w-full px-4 py-2 border-[2px] border-borderColor dark:border-dborderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-lightTxt dark:text-dlightTxt mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                  step="any"
                  placeholder="34.0195"
                  className="bg-lightMain dark:bg-dlightMain w-full px-4 py-2 border-[2px] border-borderColor dark:border-dborderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-lightTxt dark:text-dlightTxt mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                  step="any"
                  placeholder="-118.4912"
                  className="bg-lightMain dark:bg-dlightMain w-full px-4 py-2 border-[2px] border-borderColor dark:border-dborderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="bg-purple-300 border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-purple-800">
                <strong>Tip:</strong> Get coordinates from{' '}
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google Maps
                </a>{' '}
                by right-clicking a location
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-txt dark:text-txt py-3 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-dorangeMain via-dpinkMain to-dcyanMain text-white py-3 rounded-lg font-medium transition"
              >
                Add Memory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemoryForm;
