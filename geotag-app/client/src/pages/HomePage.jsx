import MapView from '../components/Map/MapView';
import { mockMemories } from '../data/mockData';
import Navbar from '../components/Layout/Navbar';
import { LogOut } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";


const HomePage = () => {
  const { dark, setDark } = useTheme();
  return (
    <div className="w-[100vw] h-[100vh] bg-main dark:bg-dmain">
    <div className="h-[100%] w-[100%] relative overflow-hidden">
     
      <div className="gradientContainerTop absolute z-[900] h-[50px] bg-[linear-gradient(to_bottom,theme(colors.fadeColor)_0%,transparent_100%)] 
    dark:bg-[linear-gradient(to_bottom,theme(colors.dfadeColor)_0%,transparent_100%)] top-0 w-[100%]"></div>
      <Navbar/> 
      <MapView memories={mockMemories}/>

      <div className="w-fit absolute bottom-[20px] left-1/2 -translate-x-1/2 z-[950]">
        <p className="font-semibold bg-gradient-to-r from-dorangeMain via-dpinkMain to-dcyanMain dark:from-orangeMain/70 dark:via-pinkMain/70 dark:to-cyanMain/70 
        bg-clip-text text-transparent text-[0.8rem]">
          &lt;&lt;Click on any marker to view memories from that location&gt;&gt;
        </p>
      </div>
      
       <div className="gradientContainerBottom absolute z-[900] h-[50px] bg-[linear-gradient(to_top,theme(colors.fadeColor)_0%,transparent_100%)] 
    dark:bg-[linear-gradient(to_top,theme(colors.dfadeColor)_0%,transparent_100%)] bottom-0 w-[100%]"></div>
    </div>

   
    </div>
  );
};

export default HomePage;