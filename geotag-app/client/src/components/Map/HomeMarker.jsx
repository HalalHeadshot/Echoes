import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect,useRef } from "react";
import gsap from "gsap";

const homeMarkerIcon = new L.Icon({
  iconUrl: "/homepin.png", // path relative to public folder
  iconRetinaUrl: "/homepin.png", // optional, can be same
  iconSize: [50, 50], // adjust size to fit your image
  iconAnchor: [15, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -50], // where the popup opens relative to the icon
});

  



const HomeMarker = ({ position }) => {
  //home pin load-in animation 
   useEffect(() => {
    if (!markerRef.current) return;

    const el = markerRef.current._icon; // actual DOM element of the marker

    // set initial scale to 0 (hidden)
    gsap.set(el, { scale: 0, transformOrigin: "center" });

    // animate pop-in: scale up then shrink to normal
    gsap.to(el, {
      scale: 1.5,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(el, { scale: 1, duration: 0.3, ease: "back.out(3)" });
      },
    });
  }, [position]);

   const markerRef = useRef(null);
  return (
    <Marker ref={markerRef} position={[position.lat, position.lng]} icon={homeMarkerIcon}>
      
    </Marker>
  );
};

export default HomeMarker;
