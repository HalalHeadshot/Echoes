import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const homeMarkerIcon = new L.Icon({
  iconUrl: "/homepin.png", // path relative to public folder
  iconRetinaUrl: "/homepin.png", // optional, can be same
  iconSize: [50, 50], // adjust size to fit your image
  iconAnchor: [15, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -50], // where the popup opens relative to the icon
});

const HomeMarker = ({ position }) => {
  return (
    <Marker position={[position.lat, position.lng]} icon={homeMarkerIcon}>
      <Popup>Home</Popup>
    </Marker>
  );
};

export default HomeMarker;
