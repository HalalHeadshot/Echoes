import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useTheme } from "../../context/ThemeContext";
import CustomMarker from "./CustomMarker";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeMarker from "./HomeMarker"; // optional component to render home pin

const MapView = ({ memories }) => {
  const defaultCenter = [19.0866, 72.9095];
  const defaultZoom = 11;
  const { dark } = useTheme();

  const [homePosition, setHomePosition] = useState(null);

  const tileUrls = {
    streets: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  };

  const mapStyle = dark ? "dark" : "light";

  // Fetch user's home location from backend
  useEffect(() => {
    const fetchHomeLocation = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/gethome", { withCredentials: true });
        if (response.data?.lat && response.data?.lng) {
          setHomePosition({ lat: response.data.lat, lng: response.data.lng });
        }
      } catch (err) {
        console.error("Error fetching home location:", err.response?.data || err.message);
      }
    };
    fetchHomeLocation();
  }, []);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={homePosition ? [homePosition.lat, homePosition.lng] : defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
        className="overflow-hidden relative rounded-lg bg-main dark:bg-dmain"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url={tileUrls[mapStyle]}
          subdomains={["a", "b", "c", "d"]}
        />

        {/* Home marker if available */}
        {homePosition && <HomeMarker position={homePosition} />}

        {/* Use the new CustomMarker for each memory */}
        {memories.map(memory => (
          <CustomMarker key={memory.id} memory={memory} />
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default MapView;

