import MapView from '../components/Map/MapView';
import { mockMemories } from '../data/mockData';
import Navbar from '../components/Layout/Navbar';
import { LogOut } from 'lucide-react';

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="mt-[70px] px-[16px] pt-[5px] w-[100%]">

      <MapView memories={mockMemories}/>

      <div className="bg-[#ffffff] rounded-[40px] px-[15px] py-[12px] w-fit absolute top-[86px] left-[26px] z-[500] border-[1px] border-gray-400">
        <h1 className="text-[1.4rem] font-bold text-gray-800">
          My Memory Map
        </h1>
        <p className="text-gray-600 text-[0.8rem]">
          Click on any marker to view memories from that location
        </p>
      </div>

    </div>
    </>
  );
};

export default HomePage;