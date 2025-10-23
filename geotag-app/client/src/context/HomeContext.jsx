import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [homePosition, setHomePosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeLocation = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/gethome", { withCredentials: true });
        if (response.data?.lat && response.data?.lng) {
          setHomePosition({ lat: response.data.lat, lng: response.data.lng });
        }
      } catch (err) {
        console.error("Error fetching home location:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeLocation();
  }, []);

  return (
    <HomeContext.Provider value={{ homePosition, setHomePosition, loading }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => useContext(HomeContext);
