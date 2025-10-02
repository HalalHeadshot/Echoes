import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const MapView = ({ memories }) => {
  // Default center (Los Angeles)
  const defaultCenter = [34.0522, -118.2437];
  const defaultZoom = 9;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      zoomControl={false} 
      style={{ height: '600px', width: '100%' }}
      className="rounded-t-[50px] shadow-lg overflow-hidden relative border-[1px] border-gray-400 "
    >
      {/* Map tiles from OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Add markers for each memory */}
      {memories.map((memory) => (
        <Marker
          key={memory.id}
          position={[
            memory.location.coordinates[1], // latitude
            memory.location.coordinates[0]  // longitude
          ]}
        >
          <Popup maxWidth={300}>
            <div className="p-2">
              <img
                src={memory.photoUrl}
                alt={memory.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h3 className="font-bold text-lg mb-1">{memory.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{memory.description}</p>
              <p className="text-xs text-gray-500">📍 {memory.location.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;