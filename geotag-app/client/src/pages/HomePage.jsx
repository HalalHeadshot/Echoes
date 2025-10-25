import { Locate } from "lucide-react";
import React, { useState } from "react";
import MapView from "../components/Map/MapView";
import { mockMemories } from "../data/mockData";
import Navbar from "../components/Layout/Navbar";
import GradientText from "../components/Layout/GradientText";
import { useTheme } from "../context/ThemeContext";
import { useHome } from "../context/HomeContext";
import AddMemoryForm from "../components/Memories/AddMemoryForm";

const HomePage = () => {
  const { dark } = useTheme();
  const { homePosition, loading } = useHome();

  const [addingMode, setAddingMode] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleMapClick = (latlng) => {
    if (!addingMode) return;
    setSelectedPosition(latlng);
    setShowForm(true);
    setAddingMode(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedPosition(null);
  };

  // 🔹 Resets map view to current home position
  const resetToAutoLocation = () => {
    if (!homePosition) return alert("Home location not available.");
    // You could also trigger map pan programmatically if you store the map ref in context
    alert("Reset to your current home location!");
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-main dark:bg-dmain relative">
      <div className="h-full w-full relative overflow-hidden">
        {/* 🔹 Hide Navbar in add mode */}
        {!addingMode && <Navbar />}

        {/* 🔹 Add mode info bar */}
        {addingMode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1001] px-4 py-2 rounded-full bg-dmain/80 dark:bg-main/80 text-dtxt dark:text-txt font-medium shadow-md text-sm backdrop-blur-sm">
            Add Memory Mode — Click on the map to add a memory
          </div>
        )}

        {/* 🔹 Map */}
        {!loading && (
          <MapView
            memories={mockMemories}
            homePosition={homePosition}
            addingMode={addingMode}
            onMapClick={handleMapClick}
          />
        )}

        {/* 🔹 Hint text */}
        {!addingMode && (
          <div className="w-fit absolute bottom-[20px] left-1/2 -translate-x-1/2 z-[950]">
            <GradientText
              colors={[
                "#9f9f9fff",
                "#3c3c3cff",
                "#adadadff",
                "#3c3c3cff",
                "#727272ff",
              ]}
              animationSpeed={5}
              showBorder={false}
              className="font-semibold text-[1rem]"
            >
              &lt;&lt;Click on any marker to view memories from that location&gt;&gt;
            </GradientText>
          </div>
        )}

       {addingMode && (
         <button
           onClick={() => {
             if (!navigator.geolocation) {
               alert("Geolocation is not supported by your browser.");
               return;
             }
       
             navigator.geolocation.getCurrentPosition(
               (pos) => {
                 const { latitude, longitude } = pos.coords;
                 const latlng = { lat: latitude, lng: longitude };
                 setSelectedPosition(latlng);
                 setShowForm(true);
                 setAddingMode(false);
               },
               (err) => {
                 if (err.code === 1) {
                   alert(
                     "Location access denied. Please enable location permission for this website in your browser settings."
                   );
                 } else if (err.code === 2) {
                   alert("Location unavailable. Try again in a few seconds.");
                 } else {
                   alert("Failed to get location. Please try again.");
                 }
               },
               { enableHighAccuracy: true, timeout: 10000 }
             );
           }}
           className="absolute w-[60px] aspect-square bottom-[90px] left-[20px] bg-dlightMain2 text-dtxt text-[2rem] grid place-content-center rounded-full shadow-md hover:bg-dlightMain2 transition-all z-[1000]"
           title="Add memory at your current location"
         >
           <Locate />
         </button>
       )}

        {/* 🔹 Add / Cancel Button */}
        <button
          onClick={() => {
            setAddingMode((prev) => !prev);
            setSelectedPosition(null);
          }}
          className={`w-[60px] aspect-square shadow-xl grid place-content-center text-[2rem] rounded-full bottom-[20px] left-[20px] absolute z-[1000] transition-all ${
            addingMode
              ? "bg-dlightMain2 text-white"
              : "bg-dmain text-dtxt dark:bg-main dark:text-txt"
          }`}
          title={addingMode ? "Cancel adding memory" : "Add new memory"}
        >
          +
        </button>

        {/* 🔹 Bottom gradient */}
        <div className="gradientContainerBottom absolute z-[900] h-[50px] bg-[linear-gradient(to_top,theme(colors.fadeColor)_0%,transparent_100%)] 
          dark:bg-[linear-gradient(to_top,theme(colors.dfadeColor)_0%,transparent_100%)] bottom-0 w-full" />

        {/* 🔹 Add Memory Form */}
        {showForm && selectedPosition && (
          <AddMemoryForm position={selectedPosition} onClose={handleFormClose}
           onAdd={(newMemory) => {
      // Add new memory to your list
      mockMemories.push(newMemory); // or use your actual state if you store memories in state
      setShowForm(false); // close the form
    }} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
