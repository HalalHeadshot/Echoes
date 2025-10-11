import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MemoriesPage from './pages/MemoriesPage';
import TimelinePage from './pages/TimelinePage';
import AuthPage from './pages/auth/AuthPage';
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;