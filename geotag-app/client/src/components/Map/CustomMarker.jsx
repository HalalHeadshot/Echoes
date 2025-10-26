
import { Marker, Popup } from "react-leaflet";
import {MapPin} from 'lucide-react';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

const CustomMarker = ({ memory }) => {
  const customIcon = L.divIcon({
    className: "", // removes default leaflet marker styles
    html: `
      <div class="w-16 h-16 rounded-lg border-[2px] border-dmain dark:border-main shadow-lg bg-cover bg-center"
     style="background-image: url('${memory.photoUrl}')">
     </div>
    `,
    iconSize: [64, 64],
    iconAnchor: [32, 64], // bottom of marker aligns with location
    popupAnchor: [0, -70], // popup offset above marker
  });

  return (
    <Marker
      position={[
        memory.location.coordinates[1],
        memory.location.coordinates[0],
      ]}
      icon={customIcon}
    >
      <Popup maxWidth={250} keepInView={true} autoPanPadding={[20, 70]}>
        <div>
          <img
            src={memory.photoUrl}
            alt={memory.title}
            className="w-full h-40 object-cover rounded-lg mb-2"
          />

          <div className="px-[5px]">
            <h3 className="font-bold text-lg">{memory.title}</h3>
            <p className="text-sm my-[10px]">{memory.description}</p> 
            <p className="text-xs text-gray-500 flex items-center justify-center"><div className="scale-[0.8]"><MapPin/></div> {memory.location.address}</p>
         </div>

        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
