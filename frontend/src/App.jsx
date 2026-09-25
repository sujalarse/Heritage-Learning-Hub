import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherResources from './pages/TeacherResources';
// Bringing in your 7 blank pages
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Explore from './pages/Explore';
import HeritageDetail from './pages/HeritageDetail';
import Quiz from './pages/Quiz';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* The menu stays permanently at the top */}
      <Routes>
        {/* Defining the URL paths for each page */}
        <Route path="/teacher/upload" element={<TeacherResources />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/heritage/:id" element={<HeritageDetail />} />
        <Route path="/quiz/:moduleId" element={<Quiz />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}