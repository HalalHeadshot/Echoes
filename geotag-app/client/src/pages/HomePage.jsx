import MapView from '../components/Map/MapView';
import { mockMemories } from '../data/mockData';
import Navbar from '../components/Layout/Navbar';
import GradientText from '../components/Layout/GradientText';
import { useTheme } from "../context/ThemeContext";
import { useHome } from "../context/HomeContext";

const HomePage = () => {
  const { dark } = useTheme();
  const { homePosition, loading } = useHome();

  return (
    <div className="w-[100vw] h-[100vh] bg-main dark:bg-dmain">
      <div className="h-[100%] w-[100%] relative overflow-hidden">
        <div className="gradientContainerTop absolute z-[900] h-[50px] bg-[linear-gradient(to_bottom,theme(colors.fadeColor)_0%,transparent_100%)] 
          dark:bg-[linear-gradient(to_bottom,theme(colors.dfadeColor)_0%,transparent_100%)] top-0 w-[100%]" />
        
        <Navbar />

        {!loading && (
          <MapView memories={mockMemories} homePosition={homePosition} />
        )}

        <div className="w-fit absolute bottom-[20px] left-1/2 -translate-x-1/2 z-[950]">
          <GradientText
            colors={["#9f9f9fff", "#3c3c3cff", "#adadadff", "#3c3c3cff", "#727272ff"]}
            animationSpeed={5}
            showBorder={false}
            className="font-semibold text-[1rem]"
          >
            &lt;&lt;Click on any marker to view memories from that location&gt;&gt;
          </GradientText>
        </div>

        <div className="gradientContainerBottom absolute z-[900] h-[50px] bg-[linear-gradient(to_top,theme(colors.fadeColor)_0%,transparent_100%)] 
          dark:bg-[linear-gradient(to_top,theme(colors.dfadeColor)_0%,transparent_100%)] bottom-0 w-[100%]" />
      </div>
    </div>
  );
};

export default HomePage;
