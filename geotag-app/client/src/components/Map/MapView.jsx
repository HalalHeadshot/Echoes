import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useTheme } from "../../context/ThemeContext";
import CustomMarker from "./CustomMarker";

const MapView = ({ memories }) => {
  const defaultCenter = [19.0866, 72.9095];
  const defaultZoom = 9;
  const { dark } = useTheme();

  const tileUrls = {
    streets: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  };

  const mapStyle = dark ? "dark" : "light";

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
        className="overflow-hidden relative rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url={tileUrls[mapStyle]}
          subdomains={["a", "b", "c", "d"]}
        />

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
