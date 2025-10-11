
import { useTheme } from "../context/ThemeContext";
import Navbar from '../components/Layout/Navbar';

const TimelinePage = () => {
  const { dark, setDark } = useTheme();
  return (
    <div className="bg-main dark:bg-dmain w-full min-h-screen flex flex-col px-[30px]">
      <Navbar />
    </div>
  );
};

export default TimelinePage;
