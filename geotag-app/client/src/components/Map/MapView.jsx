import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { useTheme } from "../../context/ThemeContext";

// Fix default marker icons in React-Leaflet
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
  
  const defaultCenter = [19.0866, 72.9095];
  const defaultZoom = 9;
  const { dark } = useTheme();

  const tileUrls = {
  streets: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",           // default OSM
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",  // Carto Light
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",    // Carto Dark
  };

 const mapStyle = dark ? "dark" : "streets"; // auto switch based on global theme
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
        className="overflow-hidden relative rounded-lg"
      >
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
  url={tileUrls[mapStyle]}
  subdomains={['a', 'b', 'c', 'd']} // required for Carto tiles
  //Tile servers often use multiple subdomains (a, b, c, d) to allow browsers to download more tiles in parallel.
/>

        {/* Add markers for each memory */}
        {memories.map(memory => (
          <Marker
            key={memory.id}
            position={[
              memory.location.coordinates[1], // lat
              memory.location.coordinates[0], // lng
            ]}
          >
            <Popup maxWidth={250}>
              <div>
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

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default MapView;
