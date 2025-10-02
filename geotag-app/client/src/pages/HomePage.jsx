import MapView from '../components/Map/MapView';
import { mockMemories } from '../data/mockData';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          My Memory Map
        </h1>
        <p className="text-gray-600">
          Click on any marker to view photos and memories from that location
        </p>
      </div>

      <MapView memories={mockMemories} />

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Click on the map markers to see your memories!
        </p>
      </div>
    </div>
  );
};

export default HomePage;