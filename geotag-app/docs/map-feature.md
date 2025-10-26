# 🗺️ Map & Memory System Documentation

## Overview
The map feature uses **React Leaflet** to display the user’s home location, saved memories, and allows adding new memories interactively via map clicks or current GPS location.  

The system is built to separate concerns:  
- `HomePage.jsx` handles state and mode toggling.  
- `MapView.jsx` handles map rendering and click interactions.  
- `AddMemoryForm.jsx` handles memory creation and submission.  

---

## Core Files
| File | Purpose |
|------|---------|
| `src/pages/HomePage.jsx` | Main page; controls adding mode, handles selected position, triggers `AddMemoryForm` |
| `src/components/Map/MapView.jsx` | Renders the map, home marker, memories, and listens for clicks in add mode |
| `src/components/Memories/AddMemoryForm.jsx` | Modal form for adding new memories, receives coordinates via `position` prop |
| `src/context/HomeContext.jsx` | Provides home location context (`homePosition`) |

---

## 1. Data Flow
1. **HomePage** passes props to **MapView**:  
   - `addingMode` — whether map should allow click-to-add  
   - `onMapClick` — function to receive click coordinates  
   - `memories` — list of saved memories  
   - `homePosition` — for centering map  

2. **MapView** listens for clicks (via `useMapEvents`) only when `addingMode` is `true` and triggers `onMapClick(latlng)`.

3. **Passing Functions as Props & Closure Explanation**  
   - `HomePage` defines the function:
   ```jsx
   const handleMapClick = (latlng) => {
     if (!addingMode) return;
     setSelectedPosition(latlng);
     setShowForm(true);
     setAddingMode(false);
   };

<MapView
  addingMode={addingMode}
  onMapClick={handleMapClick}
  homePosition={homePosition}
  memories={mockMemories}
/>```

4. **To get current location we use navigator.geolocation.getCurrentPosition is the browser API to get the user’s current latitude and longitude.**

-pos.coords.latitude & pos.coords.longitude give you the coordinates.
-You then wrap it into your map’s expected { lat, lng } format and store it in state (setSelectedPosition).
-The options { enableHighAccuracy: true, timeout: 10000 }:
-enableHighAccuracy: true asks for GPS-level accuracy if available.
-timeout: 10000 means the request will fail if it takes longer than 10 seconds.
-So, no external library is needed — it’s just plain browser geolocation.

```jsx
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
      alert("Location access denied. Please enable location permission.");
    } else if (err.code === 2) {
      alert("Location unavailable. Try again.");
    } else {
      alert("Failed to get location. Please try again.");
    }
  },
  { enableHighAccuracy: true, timeout: 10000 }
);
```

5. geoJSONb used to
