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
/>

